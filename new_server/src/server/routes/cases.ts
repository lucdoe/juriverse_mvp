import { Router, Request, Response } from 'express'
import Cases from '../models/Case'
import Users from '../models/User'

const router = Router()

// get case
router.get('/', async (req: Request, res: Response) => {
	const search = req.query.searchInput
	if (search) {
		const regex = new RegExp(escapeRegex(search), 'gi')
		Cases.find({
			$or: [
				{ 'case.title': regex },
				{ categories: regex },
				{ subcategories: regex },
				{ problems: regex },
				{ 'author.name': regex },]
		},

			(err, result) => {
				if (err) {
					console.log(err)
				} else {
					if (result.length < 1) {
						const noMatch = 'No campgrounds match that query, please try again.'
						res.render('listCases', { result, noMatch })
					}
					res.render('listCases', { result })
				}
			}
		)
	} else {
		const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: 980 } }, { $or: [{ 'meta.public': true }, { 'meta.draft': false }] }] })
		const allCases = await Cases.find({ $or: [{ 'meta.public': true }, { 'meta.draft': false }] })
		const result = {
			recommendedCases,
			allCases
		}
		res.render('listCases', { result })
	}
})

// marks case as done, renders home
router.post('/done', async (req: any, res: Response) => {
	const key = req.query.key
	const user_id = req.user.id
	Users.updateOne({ user_id }, { $push: { 'cases.finished': key } }, async (err, data) => {
		const recommendedCases = await Cases.find({ 'meta.recommended': { $gt: 980 } })
		const allCases = await Cases.find({})
		const result = {
			recommendedCases,
			allCases
		}
		res.render('listCases', { result })
	})
})

const escapeRegex = (text) => {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

export default router
