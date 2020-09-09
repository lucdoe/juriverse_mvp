import { Router, Request, Response, NextFunction } from 'express'
import Case from '../models/Case'

const router = Router()

// get all cases
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const key = req.query.key
	try {
		const result = await Case.findOne({ key })
		res.render('fall', { result })
	} catch (err) {
		return 1
	}
})

// marks case as done, renders home
router.post('/done', async (req: Request, res: Response, next: NextFunction) => {
	// TODO:
	// - mark case as done
	// - authentification
	let result = await Case.find({})
	res.render('index', { result })
})

// // gets strafrecht cases
// router.get('/strafrecht', async (req: Request, res: Response, next: NextFunction) => {
// 	let result = await Case.find({ categories: 'Strafrecht' })
// 	res.render('strafrecht', { result })
// })

// // gets zivilrecht cases
// router.get('/zivilrecht', async (req: Request, res: Response, next: NextFunction) => {
// 	let result = await Case.find({ categories: 'Zivilrecht' })
// 	res.render('zivilrecht', { result })
// })

// // gets öffentliches recht cases
// router.get('/oefrecht', async (req: Request, res: Response, next: NextFunction) => {
// 	let result = await Case.find({ categories: 'Oeffentliches Recht' })
// 	res.render('oefrecht', { result })
// })

// // gets zivilrecht-bgbat
// router.get('/zivilrecht/bgbat', async (req: Request, res: Response, next: NextFunction) => {
// 	let result = await Case.find({ categories: 'Zivilrecht'}, { subcategories: 'BGB AT' })
// 	res.render('zivilrecht-bgbat', { result })
// })

// // gets zivilrecht-schuldrechtat
// router.get('/zivilrecht/schuldrechtat', async (req: Request, res: Response, next: NextFunction) => {
// 	let result = await Case.find({ categories: 'Zivilrecht'}, { subcategories: 'Schuldrecht AT' })
// 	res.render('zivilrecht-schuldrechtat', { result })
// })

// // gets zivilrecht-schuldrechtbt
// router.get('/zivilrecht/schuldrechtbt', async (req: Request, res: Response, next: NextFunction) => {
// 	let result = await Case.find({ categories: 'Zivilrecht'}, { subcategories: 'Schuldrecht BT' })
// 	res.render('zivilrecht-schuldrechtbt', { result })
// })

// // gets zivilrecht-sachenrecht
// router.get('/zivilrecht/sachenrecht', async (req: Request, res: Response, next: NextFunction) => {
// 	let result = await Case.find({ categories: 'Zivilrecht'}, { subcategories: 'Sachenrecht' })
// 	res.render('zivilrecht-sachenrecht', { result })
// })

// // gets zivilrecht-deliktsrecht
// router.get('/zivilrecht/deliktsrecht', async (req: Request, res: Response, next: NextFunction) => {
// 	let result = await Case.find({ categories: 'Zivilrecht'}, { subcategories: 'Deliktsrecht' })
// 	res.render('zivilrecht-deliktsrecht', { result })
// })

// // gets zivilrecht-bereicherungsrecht
// router.get('/zivilrecht/bereicherungsrecht', async (req: Request, res: Response, next: NextFunction) => {
// 	let result = await Case.find({ categories: 'Zivilrecht'}, { subcategories: 'Bereicherungsrecht' })
// 	res.render('zivilrecht-bereicherungsrecht', { result })
// })

// // gets oefrecht-staatsorganisationsrecht
// router.get('/oefrecht/staatsorganisationsrecht', async (req: Request, res: Response, next: NextFunction) => {
// 	let result = await Case.find({ categories: 'Oeffentliches Recht'}, { subcategories: 'Staatsorganisationsrecht' })
// 	res.render('oefrecht-staatsorganisationsrecht', { result })
// })

// // gets oefrecht-grundrechte
// router.get('/oefrecht/grundrechte', async (req: Request, res: Response, next: NextFunction) => {
// 	let result = await Case.find({ categories: 'Oeffentliches Recht'}, { subcategories: 'Grundrechte' })
// 	res.render('oefrecht-grundrechte', { result })
// })

// // gets oefrecht-europarecht
// router.get('/oefrecht/europarecht', async (req: Request, res: Response, next: NextFunction) => {
// 	let result = await Case.find({ categories: 'Oeffentliches Recht'}, { subcategories: 'Europarecht' })
// 	res.render('oefrecht-europarecht', { result })
// })

// // gets oefrecht-verwaltungsrechtat
// router.get('/oefrecht/verwaltungsrechtat', async (req: Request, res: Response, next: NextFunction) => {
// 	let result = await Case.find({ categories: 'Oeffentliches Recht'}, { subcategories: 'Verwaltungsrecht AT' })
// 	res.render('oefrecht-verwaltungsrechtat', { result })
// })

// // gets oefrecht-verwaltungsprozessrecht
// router.get('/oefrecht/verwaltungsprozessrecht', async (req: Request, res: Response, next: NextFunction) => {
// 	let result = await Case.find({ categories: 'Oeffentliches Recht'}, { subcategories: 'Verwaltungsprozessrecht' })
// 	res.render('oefrecht-verwaltungsprozessrecht', { result })
// })

// // gets oefrecht-por
// router.get('/oefrecht/por', async (req: Request, res: Response, next: NextFunction) => {
// 	let result = await Case.find({ categories: 'Oeffentliches Recht'}, { subcategories: 'POR' })
// 	res.render('oefrecht-por', { result })
// })

// // gets oefrecht-baurecht
// router.get('/oefrecht/baurecht', async (req: Request, res: Response, next: NextFunction) => {
// 	let result = await Case.find({ categories: 'Oeffentliches Recht'}, { subcategories: 'Baurecht' })
// 	res.render('oefrecht-baurecht', { result })
// })

// // gets oefrecht-staatshaftungsrecht
// router.get('/oefrecht/staatshaftungsrecht', async (req: Request, res: Response, next: NextFunction) => {
// 	let result = await Case.find({ categories: 'Oeffentliches Recht'}, { subcategories: 'Staatshaftungsrecht' })
// 	res.render('oefrecht-staatshaftungsrecht', { result })
// })

// // gets strafrecht-straftatat
// router.get('/strafrecht/straftatat', async (req: Request, res: Response, next: NextFunction) => {
// 	let result = await Case.find({ categories: 'Strafrecht'}, { subcategories: 'Straftat AT' })
// 	res.render('strafrecht-straftatat', { result })
// })

// // gets strafrecht-straftatbt
// router.get('/strafrecht/straftatbt', async (req: Request, res: Response, next: NextFunction) => {
// 	let result = await Case.find({ categories: 'Strafrecht'}, { subcategories: 'Straftat BT' })
// 	res.render('strafrecht-straftatbt', { result })
// })

export default router
