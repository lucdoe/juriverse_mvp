import { Router, Request, Response, NextFunction } from 'express'
import Case from '../models/Case'

const router = Router()

// gets oefrecht-staatsorganisationsrecht
router.get('/oefrecht/staatsorganisationsrecht', async (req: Request, res: Response, next: NextFunction) => {
	let result = await Case.find({ categories: 'Öffentliches Recht'}, { subcategories: 'Staatsorganisationsrecht' })
	res.render('oefrecht-staatsorganisationsrecht', { result })
})

// gets oefrecht-grundrechte
router.get('/oefrecht/grundrechte', async (req: Request, res: Response, next: NextFunction) => {
	let result = await Case.find({ categories: 'Öffentliches Recht'}, { subcategories: 'Grundrechte' })
	res.render('oefrecht-grundrechte', { result })
})

// gets oefrecht-europarecht
router.get('/oefrecht/europarecht', async (req: Request, res: Response, next: NextFunction) => {
	let result = await Case.find({ categories: 'Öffentliches Recht'}, { subcategories: 'Europarecht' })
	res.render('oefrecht-europarecht', { result })
})

// gets oefrecht-verwaltungsrechtat
router.get('/oefrecht/verwaltungsrechtat', async (req: Request, res: Response, next: NextFunction) => {
	let result = await Case.find({ categories: 'Öffentliches Recht'}, { subcategories: 'Verwaltungsrecht AT' })
	res.render('oefrecht-verwaltungsrechtat', { result })
})

// gets oefrecht-verwaltungsprozessrecht
router.get('/oefrecht/verwaltungsprozessrecht', async (req: Request, res: Response, next: NextFunction) => {
	let result = await Case.find({ categories: 'Öffentliches Recht'}, { subcategories: 'Verwaltungsprozessrecht' })
	res.render('oefrecht-verwaltungsprozessrecht', { result })
})

// gets oefrecht-por
router.get('/oefrecht/por', async (req: Request, res: Response, next: NextFunction) => {
	let result = await Case.find({ categories: 'Öffentliches Recht'}, { subcategories: 'POR' })
	res.render('oefrecht-por', { result })
})

// gets oefrecht-baurecht
router.get('/oefrecht/baurecht', async (req: Request, res: Response, next: NextFunction) => {
	let result = await Case.find({ categories: 'Öffentliches Recht'}, { subcategories: 'Baurecht' })
	res.render('oefrecht-baurecht', { result })
})

// gets oefrecht-staatshaftungsrecht
router.get('/oefrecht/staatshaftungsrecht', async (req: Request, res: Response, next: NextFunction) => {
	let result = await Case.find({ categories: 'Öffentliches Recht'}, { subcategories: 'Staatshaftungsrecht' })
	res.render('oefrecht-staatshaftungsrecht', { result })
})

export default router
