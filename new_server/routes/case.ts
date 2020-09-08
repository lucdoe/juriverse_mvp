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
		const data = await Cases.find({})
		res.render('index', { data })
	})
})

// gets strafrecht cases
router.get('/strafrecht', async (req: Request, res: Response) => {
	let data = await Cases.find({ categories: 'Strafrecht' })
	res.render('strafrecht', { data })
})

// gets zivilrecht cases
router.get('/zivilrecht', async (req: Request, res: Response) => {
	let data = await Cases.find({ categories: 'Zivilrecht' })
	res.render('zivilrecht', { data })
})

// gets öffentliches recht cases
router.get('/oefrecht', async (req: Request, res: Response) => {
	let data = await Cases.find({ categories: 'Öffentliches Recht' })
	res.render('oefrecht', { data })
})

export default router
