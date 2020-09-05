import Case from '../models/model.Case'
import User from '../models/model.Case'
import { Router, Request, Response, NextFunction } from 'express'
var secured = require('../middlewares/secured')

const router = Router()

// GET home page.
router.get('/', secured(), async (req: Request, res: Response) => {
	const searchInput = req.query.searchInput
	if (searchInput) {
		const regex = new RegExp(escapeRegex(searchInput), 'gi')
		Case.find(
			{
				$or: [
					{ name: regex },
					{ categories: regex },
					{ subcategories: regex },
					{ problems: regex },
					{ 'author.name': regex },
				],
			},
			(err, result) => {
				if (err) {
					console.log(err)
				} else {
					if (result.length < 1) {
						const noMatch = 'No campgrounds match that query, please try again.'
					}
					res.render('index', { result })
				}
			}
		)
	} else {
		let result = await Case.find({})
		res.render('index', { result })
	}
})

const escapeRegex = (text) => {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

export default router
