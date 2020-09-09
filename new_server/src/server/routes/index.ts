import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/help', (req, res) => {
    res.render('help')
})

router.get('/contact', (req, res) => {
    res.render('contact')
})

export default router