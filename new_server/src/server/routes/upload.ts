import Cases from '../models/Case'
import { Router, Response } from 'express'

const router = Router()

router.get('/', async (req: any, res: Response) => {
    const { user_id } = req.user
    const publicCases = await Cases.find({ $and: [{ $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] }, { 'meta.isDeleted': false }, { 'author.authorId': user_id }] })
    const draftCases = await Cases.find({ $and: [{ $or: [{ 'meta.isPublished': false }, { 'meta.isDraft': true }] }, { 'meta.isDeleted': false }, { 'author.authorId': user_id }] })
    const result = {
        publicCases,
        draftCases,
        userId: user_id
    }
    res.render('yourCases', { result })
})

export default router