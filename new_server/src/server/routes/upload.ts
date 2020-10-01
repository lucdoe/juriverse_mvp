import Cases from '../models/Case'
import { Router, Response } from 'express'


import { sanitizeInput } from '../middlewares/sanitizer'
import { findCases } from '../helpers/casesHelper'
import { publicCasesQuery, draftCasesQuery } from '../helpers/queries'


const router = Router()


router.get('/', async (req: any, res: Response) => {

    const { user_id } = req.user

    let userIdClean = sanitizeInput(user_id)

    const publicCases = await findCases(publicCasesQuery(userIdClean))
    const draftCases = await findCases(draftCasesQuery(userIdClean))

    const result = {
        publicCases,
        draftCases,
        userId: user_id
    }
    res.render('yourCases', { result })
})

export default router