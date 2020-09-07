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
	const user_id = req.params.userid
	Users.findOne({ user_id }, async (err, data: any) => {
		const { cases } = data
		const { drafts } = cases
		const draftCases = await Cases.find({ $and: [{ key: drafts }, { draft: true }] }).exec()
		const ownedCases = await Cases.find({ owner: user_id }).exec()
		res.render('uploadStep1', { user_id, draftCases, ownedCases })
	})
})

router.get('/:userid/faelle/upload', (req, res) => {
	const userId = req.params.userid
	res.render('uploadStep2', { userId })
})

// saving case content
router.post('/:userid/faelle', (req: any, res) => {
	const userId = req.params.userid
	const caseId = uuidv4()
	const { uploadTitle, sachverhalt, aufgabe, musterloesung, fussnoten } = req.body
	const data = {
		case_id: caseId,
		author: {
			author_id: userId,
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

export default router
