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
		const edits = await Cases.find({ $and: [{ key: drafts }, { draft: true }] }).exec()
		const done = await Cases.find({ owner: userId }).exec()
		res.render('upload', { edits, done })
	})
})

export default router
