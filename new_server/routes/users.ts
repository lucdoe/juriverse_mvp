import Cases from '../models/Case'
import Users from '../models/User'
import { Router, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
const router = Router()

/* GET user profile. */
router.get('/', (req: any, res: Response) => {
	const { _raw, _json, ...userProfile } = req.user
	res.render('user', {
		userProfile: JSON.stringify(userProfile, null, 2),
		title: 'Profile page',
		_json,
		_raw,
	})
})

router.get('/:userid/faelle', (req, res) => {
	const id = req.params.userid
	const user_id = id.substring(6, 30)
	Users.findOne({ user_id }, async (err, data: any) => {
		const draftCases = await Cases.find({ $and: [{ 'author.author_id': user_id }, { 'meta.draft': true }] }).exec()
		const ownedCases = await Cases.find({ $and: [{ 'author.author_id': user_id }, { 'meta.draft': false }, { 'meta.public': true }] }).exec()
		res.render('uploadStep1', { user_id, draftCases, ownedCases })
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
	console.log(data)
	Cases.create(data, async (err, data: any) => {
		if (err) throw err
		const { author, case_id } = data
		const { author_id } = author
		res.render('uploadStep3', { author_id, case_id })
	})
})

router.post('/:userid/faelle', (req: any, res) => {
	const case_id = req.body.case_id
	const { categories, subcategories, problems } = req.body
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
	Cases.updateOne(case_id, data, async (err, data: any) => {
		const id = req.params.userid
		const user_id = id.substring(6, 30)
		Users.findOne({ user_id }, async (err, data: any) => {
			const draftCases = await Cases.find({ $and: [{ 'author.author_id': user_id }, { 'meta.draft': true }] }).exec()
			const ownedCases = await Cases.find({ $and: [{ 'author.author_id': user_id }, { 'meta.draft': false }, { 'meta.public': true }] }).exec()
			res.render('uploadStep1', { user_id, draftCases, ownedCases })
		})
	})
})

export default router
