import { Router, Request, Response } from 'express'
import Cases from '../models/Case'

const router = Router()

const categories = { categories: 'Zivilrecht' }
const rating = 980

// gets zivilrecht cases
router.get('/', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: rating } }, categories] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases
	}
	res.render('listCases', { result })
})

// gets zivilrecht-bgbat
router.get('/bgbat', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: rating } }, categories, { subcategories: 'BGB AT' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases
	}
	res.render('listCases', { result })
})

// gets zivilrecht-schuldrechtat
router.get('/schuldrechtat', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: rating } }, categories, { subcategories: 'Schuldrecht AT' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases
	}
	res.render('listCases', { result })
})

// gets zivilrecht-schuldrechtbt
router.get('/schuldrechtbt', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: rating } }, categories, { subcategories: 'Schuldrecht BT' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases
	}
	res.render('listCases', { result })
})

// gets zivilrecht-sachenrecht
router.get('/sachenrecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: rating } }, categories, { subcategories: 'Sachenrecht' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases
	}
	res.render('listCases', { result })
})

// gets zivilrecht-deliktsrecht
router.get('/deliktsrecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: rating } }, categories, { subcategories: 'Deliktsrecht' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases
	}
	res.render('listCases', { result })
})

// gets zivilrecht-bereicherungsrecht
router.get('/bereicherungsrecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: rating } }, categories, { subcategories: 'Bereicherungsrecht' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases
	}
	res.render('listCases', { result })
})

export default router
