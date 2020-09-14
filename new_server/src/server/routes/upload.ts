import Cases from '../models/Case'
import Users from '../models/User'
import { Router, Response } from 'express'

const router = Router()

router.get('/', async (req: any, res: Response) => {
    const { user_id } = req.user
    const publicCases = await Cases.find({ $and: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }, { 'author.authorId': user_id }] })
    const draftCases = await Cases.find({ $and: [{ 'meta.isPublished': false }, { 'meta.isDraft': true }, { 'author.authorId': user_id }] })
    const result = {
        publicCases,
        draftCases
    }
    res.render('yourCases', { result })
})

export default router