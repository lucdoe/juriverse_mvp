
import { Router, Request, Response } from 'express'
import Users from '../models/User'

const router = Router()

router.get('/profile', async (req: any, res) => {
    const { user_id } = req.user
    const user: any = await Users.findOne({ userId: user_id })
    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    // const signupDate = await user.meta.signupDate.toLocaleDateString('de-DE', options)

    const result = {
        user,
        authorName: req.user.displayName,
        picture: req.user.picture,
    }

    res.render('editProfile', { result })
})

router.post('/profile', async (req: any, res) => {
    const { userId, profileText, university, progress } = req.body
    await Users.updateOne({ userId }, { profileText, university, progress })

    res.redirect('/users')
})

export default router