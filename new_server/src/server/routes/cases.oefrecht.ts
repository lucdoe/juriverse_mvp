import { Router, Request, Response } from 'express'
import Cases from '../models/Case'

const router = Router()

const categories = { categories: 'Oeffentliches Recht' }
const rating = 980

// getsall strafrecht
router.get('/', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: rating } }, categories] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases
	}
	res.render('strafrecht', { result })
})

// gets oefrecht-staatsorganisationsrecht
router.get('/staatsorganisationsrecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: rating } }, categories, { subcategories: 'Staatsorganisationsrecht' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases
	}
	res.render('oefrecht-staatsorganisationsrecht', { result })
})

// gets oefrecht-grundrechte
router.get('/grundrechte', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: rating } }, categories, { subcategories: 'Grundrechte' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases
	}
	res.render('oefrecht-grundrechte', { result })
})

// gets oefrecht-europarecht
router.get('/europarecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: rating } }, categories, { subcategories: 'Europarecht' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases
	}
	res.render('oefrecht-europarecht', { result })
})

// gets oefrecht-verwaltungsrechtat
router.get('/verwaltungsrechtat', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: rating } }, categories, { subcategories: 'Verwaltungsrecht AT' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases
	}
	res.render('oefrecht-verwaltungsrechtat', { result })
})

// gets oefrecht-verwaltungsprozessrecht
router.get('/verwaltungsprozessrecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: rating } }, categories, { subcategories: 'Verwaltungsprozessrecht' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases
	}
	res.render('oefrecht-verwaltungsprozessrecht', { result })
})

// gets oefrecht-por
router.get('/por', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: rating } }, categories, { subcategories: 'POR' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases
	}
	res.render('oefrecht-por', { result })
})

// gets oefrecht-baurecht
router.get('/baurecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: rating } }, categories, { subcategories: 'Baurecht' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases
	}
	res.render('oefrecht-baurecht', { result })
})

// gets oefrecht-staatshaftungsrecht
router.get('/staatshaftungsrecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: rating } }, categories, { subcategories: 'Staatshaftungsrecht' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases
	}
	res.render('oefrecht-staatshaftungsrecht', { result })
})

export default router
