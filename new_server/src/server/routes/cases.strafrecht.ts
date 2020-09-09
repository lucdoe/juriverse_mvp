import { Router, Request, Response, NextFunction } from 'express'
import Case from '../models/Case'

const router = Router()

// gets strafrecht-straftatat
router.get('/strafrecht/straftatat', async (req: Request, res: Response, next: NextFunction) => {
	let result = await Case.find({ categories: 'Strafrecht'}, { subcategories: 'Straftat AT' })
	res.render('strafrecht-straftatat', { result })
})

// gets strafrecht-straftatbt
router.get('/strafrecht/straftatbt', async (req: Request, res: Response, next: NextFunction) => {
	let result = await Case.find({ categories: 'Strafrecht'}, { subcategories: 'Straftat BT' })
	res.render('strafrecht-straftatbt', { result })
})

export default router
