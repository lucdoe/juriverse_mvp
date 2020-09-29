import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
    const user = req.user
    res.redirect('/login')
})

router.get('/help', async (req, res) => {
    res.render('help')
})

export default router