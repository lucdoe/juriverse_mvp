import Cases from '../models/Case'
import { Router, Response } from 'express'
import DOMPurify from '../middlewares/sanitizer'

const router = Router()

router.get('/', async (req: any, res: Response) => {

    const { user_id } = req.user

    let user_idClean = DOMPurify.sanitize(user_id)

    const publicCases = await Cases.find({ $and: [{ 'meta.isPublished': true }, { 'meta.isDeleted': false }, { 'author.authorId': user_idClean }] })
    const draftCases = await Cases.find({ $and: [{ 'meta.isDraft': true }, { 'meta.isDeleted': false }, { 'author.authorId': user_idClean }] })

    const result = {
        publicCases,
        draftCases,
        userId: user_id
    }
    res.render('yourCases', { result })
})

export default router