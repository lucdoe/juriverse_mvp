import { Router, Request, Response } from 'express'
import Case from '../models/Case'

const router = Router()

// gets zivilrecht cases
router.get('/', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Zivilrecht' })
	res.render('zivilrecht', { result })
})

// gets zivilrecht-bgbat
router.get('/bgbat', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Zivilrecht' }, { subcategories: 'BGB AT' })
	res.render('zivilrecht-bgbat', { result })
})

// gets zivilrecht-schuldrechtat
router.get('/schuldrechtat', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Zivilrecht' }, { subcategories: 'Schuldrecht AT' })
	res.render('zivilrecht-schuldrechtat', { result })
})

// gets zivilrecht-schuldrechtbt
router.get('/schuldrechtbt', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Zivilrecht' }, { subcategories: 'Schuldrecht BT' })
	res.render('zivilrecht-schuldrechtbt', { result })
})

// gets zivilrecht-sachenrecht
router.get('/sachenrecht', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Zivilrecht' }, { subcategories: 'Sachenrecht' })
	res.render('zivilrecht-sachenrecht', { result })
})

// gets zivilrecht-deliktsrecht
router.get('/deliktsrecht', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Zivilrecht' }, { subcategories: 'Deliktsrecht' })
	res.render('zivilrecht-deliktsrecht', { result })
})

// gets zivilrecht-bereicherungsrecht
router.get('/bereicherungsrecht', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Zivilrecht' }, { subcategories: 'Bereicherungsrecht' })
	res.render('zivilrecht-bereicherungsrecht', { result })
})
export default router
