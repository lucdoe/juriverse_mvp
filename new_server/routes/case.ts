import { Router, Request, Response, NextFunction } from 'express'
import Case from '../models/Case'

const router = Router()

// gett all cases
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const key = req.query.key
	try {
		const result = await Case.findOne({ key })
		res.render('fall', { result })
	} catch (err) {
		return 1
	}
})

// marks case as done, renders home
router.post('/done', async (req: Request, res: Response, next: NextFunction) => {
	// TODO:
	// - mark case as done
	// - authentification
	let result = await Case.find({})
	res.render('index', { result })
})

// gets strafrecht cases
router.get('/strafrecht', async (req: Request, res: Response, next: NextFunction) => {
	let result = await Case.find({ categories: 'Strafrecht' })
	res.render('strafrecht', { result })
})

// creates case
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	const newCase = req.body
	Case.create(newCase, (err, small) => {
		if (err) throw err
		res.render('index')
	})
})

export default router
