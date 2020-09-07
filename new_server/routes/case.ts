import { Router, Request, Response, NextFunction } from 'express'
import Case from '../models/Case'
import Users from '../models/User'

const router = Router()

// get case
router.get('/', async (req: any, res: Response, next: NextFunction) => {
	const key = req.query.key
	try {
		const result = await Case.findOne({ case_id: key }, (err, data) => {
			res.render('fall', { data })
		})
	} catch (err) {
		return 1
	}
})

// marks case as done, renders home
router.post('/done', async (req: any, res: Response) => {
	const key = req.query.key
	const userId = req.user.id
	Users.updateOne({ id: userId }, { $push: { 'cases.finished': key } }).exec()
	const result = await Case.find({})
	res.render('index', { result })
})

// gets strafrecht cases
router.get('/strafrecht', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Strafrecht' })
	res.render('strafrecht', { result })
})

// gets zivilrecht cases
router.get('/zivilrecht', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Zivilrecht' })
	res.render('zivilrecht', { result })
})

// gets zivilrecht cases
router.get('/oefrecht', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Öffentliches Recht' })
	res.render('oefrecht', { result })
})

export default router
