import { Router } from 'express'
import Case from '../models/Case'

const router = Router()

// GET home page.
router.get('/', async (req, res) => {
	let result = await Case.find({})
	res.render('index', { result })
})

export default router
