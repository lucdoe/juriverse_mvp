import Cases from '../models/Case'
import Users from '../models/User'
import { Router, Response } from 'express'

const router = Router()

// get user profile
router.get('/', async (req: any, res: Response) => {
	const { user_id } = req.user
	const user = await Users.findOne({ user_id })
	await Cases.find({ 'author.authorId': user_id }, (err, allCases: any) => {
		const result = {
			user,
			allCases,
			authorName: req.user.displayName
		}
		const data = req.user
		res.render('profile', { result, data })
	})
})

// get one user
router.get('/:id', async (req: any, res) => {
	const { id } = req.params
	const data = req.user
	const user = await Users.findOne({ userId: id })
	await Cases.find({ 'author.authorId': id }, (err, allCases: any) => {
		const result = {
			user,
			allCases,
			authorName: allCases[0].author.name
		}
		res.render('profile', { result, data })
	})
})

// get all cases for one user
router.get('/:id/cases', async (req, res) => {
	const { user_id } = req.params
	const user = await Users.findOne({ user_id })
	const allCases = await Cases.find({ 'author.author_id': user_id })
	const result = {
		allCases,
		user
	}
	res.render('profile', { result })
})

// marks user as deleted
router.post('/:id/delete', async (req: any, res) => {
	const { user_id } = req.user
	const result = await Users.update({ id: user_id }, { isDeleted: true })
	res.render('profile', { result })
})

// update user
router.post('/:id/update', async (req: any, res) => {
	const { user_id } = req.user
	const data = req.body
	const result = await Users.update({ id: user_id }, { data })
	res.render('profile', { result })
})

export default router
