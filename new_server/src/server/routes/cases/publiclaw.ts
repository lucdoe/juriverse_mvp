import { Router, Request, Response } from 'express'
import Cases from '../../models/Case'

const router = Router()

const categories = { categories: 'Öffentliches Recht' }
const rating = 900

// getsall Öffentliches Recht
router.get('/', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find({ $and: [categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	if (recommendedCases.length || allCases.length == 0) {
		const noMatch = 'Hier gibt es leider noch keinen Fall.'
		const result = {
			noMatch,
			category: 'Öffentliches Recht - Coming soon!'
		}
		res.render('listCases', { result })
	}
	const result = {
		recommendedCases,
		allCases,
		category: 'Öffentliches Recht'
	}
	res.render('listCases', { result })
})

// gets oefrecht-staatsorganisationsrecht
router.get('/staatsorganisationsrecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Staatsorganisationsrecht' }, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find({ $and: [categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const result = {
		recommendedCases,
		allCases,
		category: 'Öffentliches Recht'
	}
	res.render('listCases', { result })
})

// gets oefrecht-grundrechte
router.get('/grundrechte', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Grundrechte' }, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find({ $and: [categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const result = {
		recommendedCases,
		allCases,
		category: 'Öffentliches Recht'
	}
	res.render('listCases', { result })
})

// gets oefrecht-europarecht
router.get('/europarecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Europarecht' }, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find({ $and: [categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const result = {
		recommendedCases,
		allCases,
		category: 'Öffentliches Recht'
	}
	res.render('listCases', { result })
})

// gets oefrecht-verwaltungsrechtat
router.get('/verwaltungsrechtat', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Verwaltungsrecht AT' }, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find({ $and: [categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const result = {
		recommendedCases,
		allCases,
		category: 'Öffentliches Recht'
	}
	res.render('listCases', { result })
})

// gets oefrecht-verwaltungsprozessrecht
router.get('/verwaltungsprozessrecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Verwaltungsprozessrecht' }, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find({ $and: [categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const result = {
		recommendedCases,
		allCases,
		category: 'Öffentliches Recht'
	}
	res.render('listCases', { result })
})

// gets oefrecht-por
router.get('/por', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'POR' }, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find({ $and: [categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const result = {
		recommendedCases,
		allCases,
		category: 'Öffentliches Recht'
	}
	res.render('listCases', { result })
})

// gets oefrecht-baurecht
router.get('/baurecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Baurecht' }, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find({ $and: [categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const result = {
		recommendedCases,
		allCases,
		category: 'Öffentliches Recht'
	}
	res.render('listCases', { result })
})

// gets oefrecht-staatshaftungsrecht
router.get('/staatshaftungsrecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Staatshaftungsrecht' }, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find({ $and: [categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const result = {
		recommendedCases,
		allCases,
		category: 'Öffentliches Recht'
	}
	res.render('listCases', { result })
})

export default router
