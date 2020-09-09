import { Router, Request, Response } from 'express'
import Case from '../models/Case'

const router = Router()

// gets strafrecht-straftatat
router.get('/strafrechtat', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Strafrecht' }, { subcategories: 'Strafrecht AT' })
	res.render('strafrecht-straftatat', { result })
})

// gets strafrecht-straftatbt
router.get('/strafrechtbt', async (req: Request, res: Response) => {
	let result = await Case.find({ categories: 'Strafrecht' }, { subcategories: 'Strafrecht BT' })
	res.render('strafrecht-straftatbt', { result })
})

export default router
