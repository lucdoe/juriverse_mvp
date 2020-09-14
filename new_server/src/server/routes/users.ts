import Cases from '../models/Case'
import Users from '../models/User'
import { Router, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
const router = Router()

/* GET user profile. */
router.get('/', (req: any, res: Response) => {
	const data = req.user
	res.render('profile', { data })
})

router.get('/:userid/cases', async (req: any, res: Response) => {
	const id = req.params.userid
	const allCases = await Cases.find({ $and: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }, { 'author.authorId': id }] })
	res.render('profile', { allCases })
})


// saving case content
router.post('/:userid/cases', (req: any, res) => {
	const user_id = req.params.userid

	let { case_id, uploadTitle, sachverhalt, aufgabe, musterloesung, _public, draft } = req.body

	if (!case_id) {
		case_id = uuidv4()

		const data = {
			case_id,
			author: {
				author_id: user_id,
				picture: req.user.picture,
				name: req.user.nickname,
				email: req.user.emails[0].value,
				uni: '',
			},
			categories: [],
			subcategories: [],
			problems: [],
			case: {
				title: uploadTitle,
				sachverhalt,
				aufgabe,
				musterloesung,
				fussnoten: '',
			},
			meta: {
				votes: 0,
				favs: 0,
				recommended: 0,
				public: true,
				draft: true,
				uploadDate: '',
			},
			selfWriteConfirm: false,
		}

		Cases.create(data, async (err, data: any) => {
			if (err) throw err
			const { author, case_id } = data
			const { author_id } = author
			res.render('uploadStep3', { author_id, case_id })
		})

	} else if (case_id && sachverhalt || aufgabe || musterloesung) {

		const data = {
			case: {
				title: uploadTitle,
				sachverhalt,
				aufgabe,
				musterloesung,
				fussnoten: '',
			},
		}

		Cases.findOneAndUpdate({ case_id }, data, async (err, data: any) => {
			if (err) throw err
			console.log(data)
			res.render('uploadStep3', { data })
		})
	}
})

router.post('/:userid/cases/modify', async (req: any, res) => {
	const { draft, _public, case_id } = req.body
	const user_id = req.params.userid
	const data = {
		meta: {
			draft, public: _public
		}
	}
	await Cases.updateOne({ case_id }, data, async (err, data) => {
		await Users.findOne({ user_id }, async (err, data: any) => {
			const draftCases = await Cases.find({ $and: [{ 'author.author_id': user_id }, { 'meta.draft': true }] }).exec()
			const ownedCases = await Cases.find({ $and: [{ 'author.author_id': user_id }, { 'meta.draft': false }, { 'meta.public': true }] }).exec()
			res.render('uploadStep1', { user_id, draftCases, ownedCases })
		})
	})
})


router.post('/:userid/cases/last', async (req: any, res) => {
	const { case_id, categories, subcategories, problems } = req.body
	const user_id = req.params.userid
	const search = {
		case_id
	}
	const data = {
		categories: [categories],
		subcategories: [subcategories],
		problems: [problems],
		meta: {
			uploadDate: Date.now(),
			public: true,
			draft: false
		},
		selfWriteConfirm: true,
	}
	await Cases.updateOne(search, data)
	res.redirect('http://localhost:3000/users/' + user_id + '/cases')
})

// NEW FROM HERE ON //

// get one user
router.get('/:id', async (req, res) => {
	const { user_id } = req.params
	const result = await Users.findOne({ user_id })
	res.render('profile', { result })
})

// get all cases for one user
router.get('/:id/cases', async (req, res) => {
	const { user_id } = req.params
	const user = await Users.findOne({ user_id })
	const allCases = await Cases.find({ 'author.author_id': user_id })
	const result = {
		allCases,
		user
	}
	res.render('profile', { result })
})

// marks user as deleted
router.post('/:id/delete', async (req: any, res) => {
	const { user_id } = req.user
	const result = await Users.update({ id: user_id }, { isDeleted: true })
	res.render('profile', { result })
})

// update user
router.post('/:id/update', async (req: any, res) => {
	const { user_id } = req.user
	const data = req.body
	const result = await Users.update({ id: user_id }, { data })
	res.render('profile', { result })
})

export default router
