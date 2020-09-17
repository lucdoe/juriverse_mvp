import { Router, Request, Response } from 'express'
import Cases from '../../models/Case'

const router = Router()

const categories = { categories: 'Zivilrecht' }
const rating = 750

// gets zivilrecht cases
router.get('/', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find({ $and: [categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const result = {
		recommendedCases,
		allCases,
		category: 'Zivilrecht'
	}
	res.render('listCases', { result })
})

// gets zivilrecht-bgbat
router.get('/bgbat', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'BGB AT' }, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find({ $and: [categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const result = {
		recommendedCases,
		allCases,
		category: 'Zivilrecht'
	}
	res.render('listCases', { result })
})

// gets zivilrecht-schuldrechtat
router.get('/schuldrechtat', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Schuldrecht AT' }, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find({ $and: [categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const result = {
		recommendedCases,
		allCases,
		category: 'Zivilrecht'
	}
	res.render('listCases', { result })
})

// gets zivilrecht-schuldrechtbt
router.get('/schuldrechtbt', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Schuldrecht BT' }, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find({ $and: [categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const result = {
		recommendedCases,
		allCases,
		category: 'Zivilrecht'
	}
	res.render('listCases', { result })
})

// gets zivilrecht-sachenrecht
router.get('/sachenrecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Sachenrecht' }, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find({ $and: [categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const result = {
		recommendedCases,
		allCases,
		category: 'Zivilrecht'
	}
	res.render('listCases', { result })
})

// gets zivilrecht-deliktsrecht
router.get('/deliktsrecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Deliktsrecht' }, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find({ $and: [categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const result = {
		recommendedCases,
		allCases,
		category: 'Zivilrecht'
	}
	res.render('listCases', { result })
})

// gets zivilrecht-bereicherungsrecht
router.get('/bereicherungsrecht', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Bereicherungsrecht' }, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find({ $and: [categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const result = {
		recommendedCases,
		allCases,
		category: 'Zivilrecht'
	}
	res.render('listCases', { result })
})

export default router
