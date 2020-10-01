import { Router, Request, Response } from 'express'


import { getCatCases } from '../../helpers/casesHelper'


const router = Router()


const categorie = 'Öffentliches Recht' 
const rating = 900


router.get('/', async (req: Request, res: Response) => {

	const { allCases, recommendedCases } = await getCatCases(rating, categorie)

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
