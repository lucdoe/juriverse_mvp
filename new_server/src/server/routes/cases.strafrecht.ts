import { Router, Request, Response } from 'express'
import Cases from '../models/Case'

const router = Router()

const categories = { categories: 'Strafrecht' }
const rating = 980

// gets all strafrecht
router.get('/', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: rating } }, categories] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases
	}
	res.render('listCases', { result })
})

// gets strafrecht-AT
router.get('/strafrechtat', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: rating } }, categories, { subcategories: 'Strafrecht AT' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases
	}
	res.render('listCases', { result })
})

// gets strafrecht-BT
router.get('/strafrechtbt', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: rating } }, categories, { subcategories: 'Strafrecht BT' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases
	}
	res.render('listCases', { result })
})

export default router
