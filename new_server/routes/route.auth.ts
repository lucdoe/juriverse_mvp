import { Router, Request, Response, NextFunction } from 'express'
import Case from '../models/model.Case'
import User from '../models/model.User'

const router = Router()

// gett all cases
router.get('/register', async (req: Request, res: Response, next: NextFunction) => {
	const key = req.query.key
	try {
		const result = await Case.findOne({ key })
		res.render('fall', { result })
	} catch (err) {
		return 1
	}
})

export default router
