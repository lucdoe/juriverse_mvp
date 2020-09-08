import Cases from '../models/Case'
import Users from '../models/User'
import { Router, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
const router = Router()

/* GET user profile. */
router.get('/', (req: any, res: Response) => {
	const data = req.user
	res.render('user', { data })
})

router.get('/:userid/faelle', (req, res) => {
	const id = req.params.userid
	if (id.length > 24) {
		const user_id = id.substring(6, 30)
		Users.findOne({ user_id }, async (err, data: any) => {
			const draftCases = await Cases.find({ $and: [{ 'author.author_id': user_id }, { 'meta.draft': true }] }).exec()
			const ownedCases = await Cases.find({ $and: [{ 'author.author_id': user_id }, { 'meta.draft': false }, { 'meta.public': true }] }).exec()
			res.render('uploadStep1', { user_id, draftCases, ownedCases })
		})
	}
	Users.findOne({ user_id: id }, async (err, data: any) => {
		const draftCases = await Cases.find({ $and: [{ 'author.author_id': id }, { 'meta.draft': true }] }).exec()
		const ownedCases = await Cases.find({ $and: [{ 'author.author_id': id }, { 'meta.draft': false }, { 'meta.public': true }] }).exec()
		res.render('uploadStep1', { user_id: id, draftCases, ownedCases })
	})
})


router.get('/:userid/faelle/upload', (req, res) => {
	const user_id = req.params.userid
	res.render('uploadStep2', { user_id })
})

// saving case content
router.post('/:userid/faelle', (req: any, res) => {
	const user_id = req.params.userid
	const case_id = uuidv4()
	const { uploadTitle, sachverhalt, aufgabe, musterloesung } = req.body
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
})

router.post('/:userid/faelle/last', async (req: any, res) => {
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
	res.redirect('http://localhost:3000/users/' + user_id + '/faelle')
})


export default router
