const express = require('express')
const router = express.Router()
import Case from '../models/Case'

// GET home page.
router.get('/', (req, res) => {
	res.render('upload')
})

router.post('/insert', (req, res) => {
	const newCase = req.body
	Case.create(newCase, (err, small) => {
		if (err) throw err
		res.render('index')
	})
})

export default router
