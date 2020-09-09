import { Router, Request, Response, NextFunction } from 'express'
import Case from '../models/Case'

const router = Router()

// gets zivilrecht cases
router.get('/zivilrecht', async (req: Request, res: Response, next: NextFunction) => {
	let result = await Case.find({ categories: 'Zivilrecht' })
	res.render('zivilrecht', { result })
})

// gets zivilrecht-bgbat
router.get('/zivilrecht/bgbat', async (req: Request, res: Response, next: NextFunction) => {
	let result = await Case.find({ categories: 'Zivilrecht'}, { subcategories: 'BGB AT' })
	res.render('zivilrecht-bgbat', { result })
})

// gets zivilrecht-schuldrechtat
router.get('/zivilrecht/schuldrechtat', async (req: Request, res: Response, next: NextFunction) => {
	let result = await Case.find({ categories: 'Zivilrecht'}, { subcategories: 'Schuldrecht AT' })
	res.render('zivilrecht-schuldrechtat', { result })
})

// gets zivilrecht-schuldrechtbt
router.get('/zivilrecht/schuldrechtbt', async (req: Request, res: Response, next: NextFunction) => {
	let result = await Case.find({ categories: 'Zivilrecht'}, { subcategories: 'Schuldrecht BT' })
	res.render('zivilrecht-schuldrechtbt', { result })
})

// gets zivilrecht-sachenrecht
router.get('/zivilrecht/sachenrecht', async (req: Request, res: Response, next: NextFunction) => {
	let result = await Case.find({ categories: 'Zivilrecht'}, { subcategories: 'Sachenrecht' })
	res.render('zivilrecht-sachenrecht', { result })
})

// gets zivilrecht-deliktsrecht
router.get('/zivilrecht/deliktsrecht', async (req: Request, res: Response, next: NextFunction) => {
	let result = await Case.find({ categories: 'Zivilrecht'}, { subcategories: 'Deliktsrecht' })
	res.render('zivilrecht-deliktsrecht', { result })
})

// gets zivilrecht-bereicherungsrecht
router.get('/zivilrecht/bereicherungsrecht', async (req: Request, res: Response, next: NextFunction) => {
	let result = await Case.find({ categories: 'Zivilrecht'}, { subcategories: 'Bereicherungsrecht' })
	res.render('zivilrecht-bereicherungsrecht', { result })
})
export default router
