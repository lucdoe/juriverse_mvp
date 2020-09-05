import Cases from '../models/Case'
import Users from '../models/User'
import { Router, Response } from 'express'
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

router.get('/:userid/faelle', (req: any, res: Response) => {
	const userId = req.params.userid
	Users.findOne({ id: userId }, async (err, data: any) => {
		const { cases } = data
		const { drafts } = cases
		const draftCases = await Cases.find({ $and: [{ key: drafts }, { draft: true }] }).exec()
		const ownedCases = await Cases.find({ owner: userId }).exec()
		res.render('uploadStep1', { userId, draftCases, ownedCases })
	})
})

router.get('/:userid/faelle/upload', (req, res) => {
	const userId = req.params.userid
	res.render('uploadStep2', { userId })
})

router.post('/:userid/faelle', (req, res) => {
	const userId = req.params.userid
	// const { title, sachverhalt, aufgabe, musterloesung } = req.body
	// Users.create(
	// 	{ owner: userId, cases: { title, sachverhalt, aufgabe, musterloesung } },
	// 	async (err, data: any) => {}
	// )
	res.render('uploadStep3', { userId })
})

export default router
