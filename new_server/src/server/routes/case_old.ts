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

// gets strafrecht cases
router.get('/strafrecht', async (req: Request, res: Response) => {
	const recommended = await Cases.find({ $and: [{ 'meta.recommended': { $gt: 980 } }, { categories: 'Strafrecht' }] })
	const all = await Cases.find({ categories: 'Strafrecht' })
	const data = {
		recommended,
		all
	}
	res.render('strafrecht', { data })
})

// gets zivilrecht cases
router.get('/zivilrecht', async (req: Request, res: Response) => {
	const recommended = await Cases.find({ $and: [{ 'meta.recommended': { $gt: 980 } }, { categories: 'Zivilrecht' }] })
	const all = await Cases.find({ categories: 'Zivilrecht' })
	const data = {
		recommended,
		all
	}
	res.render('zivilrecht', { data })
})

// gets öffentliches recht cases
router.get('/oefrecht', async (req: Request, res: Response) => {
	const recommended = await Cases.find({ $and: [{ 'meta.recommended': { $gt: 980 } }, { categories: 'Öffentliches Recht' }] })
	const all = await Cases.find({ categories: 'Öffentliches Recht' })
	const data = {
		recommended,
		all
	}
	res.render('oefrecht', { data })
})





report = [
	{
		user_id,
		case_id,
		report_text
	}
]



// /cases (-GET) - all cases

// /cases/:id (-GET) - one case

// /cases/:categories/:subcategories/?problems=''

// /cases/:id/update /delete (-POST) - reports
export default router
