import Case from '../models/Case'
import { Router, Request, Response } from 'express'

const router = Router()

// GET home page.
router.get('/', async (req: Request, res: Response) => {
	const searchInput = req.query.searchInput
	if (searchInput) {
		const regex = new RegExp(escapeRegex(searchInput), 'gi')
		Case.find(
			{
				$or: [
					{ 'case.title': regex },
					{ categories: regex },
					{ subcategories: regex },
					{ problems: regex },
					{ 'author.name': regex },
				],
			},
			(err, data) => {
				if (err) {
					console.log(err)
				} else {
					if (data.length < 1) {
						const noMatch = 'No campgrounds match that query, please try again.'
						res.render('index', { data, noMatch })
					}
					res.render('index', { data })
				}
			}
		)
	} else {
		const recommended = await Case.find({ 'meta.recommended': { $gt: 980 } })
		const all = await Case.find({})
		const data = {
			recommended,
			all
		}
		res.render('index', { data })
	}
})

const escapeRegex = (text) => {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

export default router
