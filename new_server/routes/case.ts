import { Router, Request, Response, NextFunction } from 'express'
import Case from '../models/Case'

const router = Router()

// GET home page.
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const key = req.query.key
	console.log('id: ', key)
	try {
		const result = await Case.findOne({ key })
		res.render('fall', { result })
	} catch (err) {
		return 1
	}
})

router.post('/done', async (req: Request, res: Response, next: NextFunction) => {
	let result = await Case.find({})
	res.render('index', { result })
})

export default router
