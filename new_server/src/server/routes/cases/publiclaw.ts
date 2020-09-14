import { Router, Request, Response } from 'express'
import Cases from '../../models/Case'

const router = Router()

const categories = { categories: 'Öffentliches Recht' }
const rating = 900

// getsall Öffentliches Recht
router.get('/', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases,
		category: 'Öffentliches Recht'
	}
	res.render('listCases', { result })
})

// gets oefrecht-staatsorganisationsrecht
router.get('/staatsorganisationsrecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Staatsorganisationsrecht' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases,
		category: 'Öffentliches Recht'
	}
	res.render('listCases', { result })
})

// gets oefrecht-grundrechte
router.get('/grundrechte', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Grundrechte' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases,
		category: 'Öffentliches Recht'
	}
	res.render('listCases', { result })
})

// gets oefrecht-europarecht
router.get('/europarecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Europarecht' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases,
		category: 'Öffentliches Recht'
	}
	res.render('listCases', { result })
})

// gets oefrecht-verwaltungsrechtat
router.get('/verwaltungsrechtat', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Verwaltungsrecht AT' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases,
		category: 'Öffentliches Recht'
	}
	res.render('listCases', { result })
})

// gets oefrecht-verwaltungsprozessrecht
router.get('/verwaltungsprozessrecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Verwaltungsprozessrecht' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases,
		category: 'Öffentliches Recht'
	}
	res.render('listCases', { result })
})

// gets oefrecht-por
router.get('/por', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'POR' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases,
		category: 'Öffentliches Recht'
	}
	res.render('listCases', { result })
})

// gets oefrecht-baurecht
router.get('/baurecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Baurecht' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases,
		category: 'Öffentliches Recht'
	}
	res.render('listCases', { result })
})

// gets oefrecht-staatshaftungsrecht
router.get('/staatshaftungsrecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Staatshaftungsrecht' }] })
	const allCases = await Cases.find(categories)
	const result = {
		recommendedCases,
		allCases,
		category: 'Öffentliches Recht'
	}
	res.render('listCases', { result })
})

export default router
