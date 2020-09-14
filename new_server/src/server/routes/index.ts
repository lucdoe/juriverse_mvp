import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (req, res) => {
    const user = req.user
    res.render('listCases', { user })
})

router.get('/help', (req, res) => {
    res.render('help')
})

router.get('/contact', (req, res) => {
    res.render('contact')
})

export default router