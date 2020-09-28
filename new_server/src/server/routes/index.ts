import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (req, res) => {
    const user = req.user
    res.redirect('/login')
})

router.get('/help', (req, res) => {
    res.render('help')
})

router.get('/contact', (req, res) => {
    res.render('contact')
})

router.get('/dev', (req, res) => {
    res.render('editProfile')
})

export default router