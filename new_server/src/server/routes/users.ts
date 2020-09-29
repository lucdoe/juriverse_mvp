import Cases from '../models/Case'
import Users from '../models/User'
import { Router, Response } from 'express'

const router = Router()

// get user profile
router.get('/', async (req: any, res: Response) => {
	const auth0_user = req.user
	const user: any = await Users.findOne({ userId: auth0_user.user_id })

	if (!user) {

		const new_user = {
			userId: auth0_user.user_id,
			screenname: auth0_user.nickname,
			university: "",
			profileText: "",
			progress: "",
			cases: {
				saved: [{
					caseId: "",
					savedTimestamp: "",
				}],
				opened: [{
					caseId: "",
					openTimestamp: "",
					closedTimestamp: "",
				}],
				finished: [{
					caseId: "",
					finishedTimestamp: "",
				}],
				likes: [{
					caseId: "",
					likedTimestamp: "",
				}],
				notes: [
					{
						caseId: "",
						positionIndex: "",
						note: "",
						solution: "",
						notedTimestamp: "",
					},
				],
			},
			meta: {
				visitedAuthors: [{
					authorId: "",
					visitedTimestamp: "",
				}],
				isDeleted: false,
				signupDate: Date.now(),
			},
		}

		await Users.create(new_user, async (err, our_user) => {
			let isOwnProfile = true

			await Cases.find({ 'author.authorId': auth0_user.user_id, 'meta.isDeleted': false, $or: [{ 'meta.isDraft': false }, { 'meta.isPublished': true }] }, (err, allCases: any) => {
				const result = {
					user: our_user,
					allCases,
					authorName: req.user.displayName,
					picture: req.user.picture,
					// signupDate,
					isOwnProfile,
				}
				res.render('profile', { result })
			})
		})

	} else {
		let isOwnProfile = true

		await Cases.find({ 'author.authorId': auth0_user.user_id, 'meta.isDeleted': false, $or: [{ 'meta.isDraft': false }, { 'meta.isPublished': true }] }, (err, allCases: any) => {
			const result = {
				user,
				allCases,
				authorName: req.user.displayName,
				picture: req.user.picture,
				// signupDate,
				isOwnProfile,
			}
			res.render('profile', { result })
		})
	}
})

// get one user
router.get('/:id', async (req: any, res) => {
	const { id } = req.params
	const user: any = await Users.findOne({ userId: id })
	await Cases.find({ $and: [{ 'author.authorId': id }, { $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] }] }, async (err, allCases: any) => {

		const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
		const signupDate = await user.meta.signupDate.toLocaleDateString('de-DE', options)

		const result = {
			user,
			allCases,
			authorName: allCases[0].author.name,
			picture: allCases[0].author.picture,
			signupDate
		}

		res.render('profile', { result })
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
