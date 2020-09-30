
import { Router, Request, Response } from 'express'
import Users from '../models/User'
import Cases from '../models/Case'

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
    const auth0_user = req.user
    const { userId, profileText, university, progress } = req.body
    const change = await Users.updateOne({ userId }, { profileText, university, progress })
    const user: any = await Users.findOne({ userId: auth0_user.user_id })

    let isOwnProfile = true

    await Cases.find({ 'author.authorId': auth0_user.user_id, 'meta.isDeleted': false, $or: [{ 'meta.isDraft': false }, { 'meta.isPublished': true }] }, (err, allCases: any) => {
        const result = {
            user,
            allCases,
            authorName: req.user.displayName,
            picture: req.user.picture,
            // signupDate,
            isOwnProfile,
            change
        }
        res.render('profile', { result })
    })
})

export default router