import Cases from '../models/model.Case'
import Users from '../models/model.User'
import { Router, Request, Response, NextFunction } from 'express'
const router = Router()

/* GET user profile. */
router.get('/', (req: any, res, next) => {
	const { _raw, _json, ...userProfile } = req.user
	console.log(userProfile.nickname)
	res.render('user', {
		userProfile: JSON.stringify(userProfile, null, 2),
		title: 'Profile page',
		_json,
		_raw,
	})
})

router.get('/:userid/faelle', (req, res, next) => {
	const userId = req.params.userid
	Users.findOne({ id: userId }, async (err, data: any) => {
		const { cases } = data
		const { drafts, owns } = cases
		const edits = await Cases.find({ $and: [{ key: drafts }, { draft: true }] }).exec()
		const done = await Cases.find({ owner: userId }).exec()
		const editsLenght = edits.length
		console.log('edits:  ', edits, '\n', 'owns:  ', done)
		res.render('upload', { edits, done })
	})
})

export default router
