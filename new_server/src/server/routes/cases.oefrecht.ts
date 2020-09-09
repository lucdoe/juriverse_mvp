import { Router, Request, Response } from 'express'
import Case from '../models/Case'

const router = Router()

// gets oefrecht-staatsorganisationsrecht
router.get('/staatsorganisationsrecht', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Oeffentliches Recht' }, { subcategories: 'Staatsorganisationsrecht' })
	res.render('oefrecht-staatsorganisationsrecht', { result })
})

// gets oefrecht-grundrechte
router.get('/grundrechte', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Oeffentliches Recht' }, { subcategories: 'Grundrechte' })
	res.render('oefrecht-grundrechte', { result })
})

// gets oefrecht-europarecht
router.get('/europarecht', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Oeffentliches Recht' }, { subcategories: 'Europarecht' })
	res.render('oefrecht-europarecht', { result })
})

// gets oefrecht-verwaltungsrechtat
router.get('/verwaltungsrechtat', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Oeffentliches Recht' }, { subcategories: 'Verwaltungsrecht AT' })
	res.render('oefrecht-verwaltungsrechtat', { result })
})

// gets oefrecht-verwaltungsprozessrecht
router.get('/verwaltungsprozessrecht', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Oeffentliches Recht' }, { subcategories: 'Verwaltungsprozessrecht' })
	res.render('oefrecht-verwaltungsprozessrecht', { result })
})

// gets oefrecht-por
router.get('/por', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Oeffentliches Recht' }, { subcategories: 'POR' })
	res.render('oefrecht-por', { result })
})

// gets oefrecht-baurecht
router.get('/baurecht', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Oeffentliches Recht' }, { subcategories: 'Baurecht' })
	res.render('oefrecht-baurecht', { result })
})

// gets oefrecht-staatshaftungsrecht
router.get('/staatshaftungsrecht', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Oeffentliches Recht' }, { subcategories: 'Staatshaftungsrecht' })
	res.render('oefrecht-staatshaftungsrecht', { result })
})

export default router
