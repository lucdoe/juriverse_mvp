import { Router, Request, Response } from 'express'
import Cases from '../../models/Case'

const router = Router()

const categories = { categories: 'Öffentliches Recht' }
const rating = 900

const query = {
	$and: [
		{ $or: [{ categories: 'Öffentliches Recht' }] },
		{ $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] },
		{ 'meta.isDeleted': false }
	]
}

// getsall Öffentliches Recht
router.get('/', async (req: Request, res: Response) => {

	const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: rating } }, categories, { 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const allCases = await Cases.find(query)

	if (allCases.length == 0) {

		const noMatch = true

		const result = {
			noMatch,
			category: 'Öffentliches Recht - Coming soon!'
		}
		res.render('listCases', { result })

	} else {

		const result = {
			recommendedCases,
			allCases,
			category: 'Öffentliches Recht'
		}
		res.render('listCases', { result })
	}
})

export default router
