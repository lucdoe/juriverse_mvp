import { Router, Request, Response } from 'express'
import Cases from '../../models/Case'

const router = Router()

const categories = { categories: 'Zivilrecht' }
const rating = 750

const query = {
	$and: [
		{ $or: [{ categories: 'Zivilrecht' }] },
		{ $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] },
		{ 'meta.isDeleted': false }
	]
}

// gets zivilrecht cases
router.get('/', async (req: Request, res: Response) => {

	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find(query)

	if (allCases.length == 0) {

		const noMatch = true
		const result = {
			noMatch,
			category: 'Zivilrecht - Coming soon!'
		}
		res.render('listCases', { result })

	} else {

		const result = {
			recommendedCases,
			allCases,
			category: 'Zivilrecht'
		}
		res.render('listCases', { result })
	}
})

export default router
