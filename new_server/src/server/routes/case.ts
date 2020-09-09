import { Router, Request, Response } from 'express'
import Cases from '../models/Case'
import Users from '../models/User'

const router = Router()

// get case
router.get('/', async (req: any, res: Response) => {
	const case_id = req.query.key
	try {
		await Cases.findOne({ case_id }, (err, data) => {
			res.render('fall', { data })
		})
	} catch (err) {
		return 1
	}
})

// marks case as done, renders home
router.post('/done', async (req: any, res: Response) => {
	const key = req.query.key
	const user_id = req.user.id
	Users.updateOne({ user_id }, { $push: { 'cases.finished': key } }, async (err, result) => {
		const recommended = await Cases.find({ 'meta.recommended': { $gt: 980 } })
		const all = await Cases.find({})
		const data = {
			recommended,
			all
		}
		res.render('index', { data })
	})
})

export default router
