import { Router, Request, Response } from 'express'
import Cases from '../../models/Case'

const router = Router()

const categories = { categories: 'Strafrecht' }
const rating = 870

const query = {
	$and: [
		{ $or: [{ categories: 'Strafrecht' }] },
		{ $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] },
		{ 'meta.isDeleted': false }
	]
}

// gets all strafrecht
router.get('/', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find(query)
	if (allCases.length == 0) {
		const noMatch = true
		const result = {
			noMatch,
			category: 'Strafrecht - Coming soon!'
		}
		res.render('listCases', { result })
	} else {
		const result = {
			recommendedCases,
			allCases,
			category: 'Strafrecht'
		}
		res.render('listCases', { result })
	}
})

// gets strafrecht-AT
router.get('/strafrechtat', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Strafrecht AT' }, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find({ $and: [categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const result = {
		recommendedCases,
		allCases,
		category: 'Strafrecht'
	}
	res.render('listCases', { result })
})

// gets strafrecht-BT
router.get('/strafrechtbt', async (req: Request, res: Response) => {
	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { subcategories: 'Strafrecht BT' }, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find({ $and: [categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const result = {
		recommendedCases,
		allCases,
		category: 'Strafrecht'
	}
	res.render('listCases', { result })
})

export default router
