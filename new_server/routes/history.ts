const express = require('express')
const router = express.Router()

// GET home page.
router.get('/', (req, res) => {
	res.render('history')
})

export default router
