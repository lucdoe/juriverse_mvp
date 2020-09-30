import { Router, Response } from 'express'
import Users from '../models/User'
import Cases from '../models/Case'
import DOMPurify from '../middlewares/sanitizer'

const router = Router()

router.get('/profile', async (req: any, res: Response) => {

    const { user_id } = req.user

    const userIdClean = DOMPurify.sanitize(user_id)

    const user: any = await Users.findOne({ userId: userIdClean })


    const result = {
        user,
        authorName: req.user.displayName,
        picture: req.user.picture,
    }

    res.render('editProfile', { result })
})

router.post('/profile', async (req: any, res: Response) => {

    const auth0_user = req.user
    const { userId, profileText, university, progress } = req.body

    const userIdClean = DOMPurify.sanitize(userId)
    const profileTextClean = DOMPurify.sanitize(profileText)
    const universityClean = DOMPurify.sanitize(university)
    const progressClean = DOMPurify.sanitize(progress)

    const change = await Users.updateOne({ userId: userIdClean }, { profileText: profileTextClean, university: universityClean, progress: progressClean })
    const user: any = await Users.findOne({ userId: auth0_user.user_id })

    let isOwnProfile = true

    await Cases.find({ 'author.authorId': auth0_user.user_id, 'meta.isDeleted': false, $or: [{ 'meta.isDraft': false }, { 'meta.isPublished': true }] }, (err, allCases: any) => {
        const result = {
            user,
            allCases,
            authorName: req.user.displayName,
            picture: req.user.picture,
            isOwnProfile,
            change
        }

        res.render('profile', { result })
    })
})

export default router