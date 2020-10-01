import { Router, Request, Response } from 'express'
import { create } from 'express-handlebars'
import { getCatCases } from '../../helpers/casesHelper'


const router = Router()


const categorie = 'Zivilrecht'
const rating = 750


router.get('/', async (req: Request, res: Response) => {

	const { allCases, recommendedCases } = await getCatCases(rating, categorie)

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



