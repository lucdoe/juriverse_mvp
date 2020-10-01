import Cases from '../models/Case'
import Users from '../models/User'
import { Router, Response } from 'express'


import { sanitizeInput } from '../middlewares/sanitizer'


const router = Router()


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
				isOwnProfile,
			}
			res.render('profile', { result })
		})
	}
})

// get one user
router.get('/:id', async (req: any, res) => {

	const { id } = req.params

	let user_idClean = sanitizeInput(id)

	const user: any = await Users.findOne({ userId: id })
	await Cases.find({ $and: [{ 'author.authorId': user_idClean }, { $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] }] }, async (err, allCases: any) => {

		const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

		if (user.meta.signupDate) {

			let signupDate = await user.meta.signupDate.toLocaleDateString('de-DE', options)

			const result = {
				user,
				allCases,
				authorName: allCases[0].author.name,
				picture: allCases[0].author.picture,
				signupDate
			}
			res.render('profile', { result })
		} else {

			const result = {
				user,
				allCases,
				authorName: allCases[0].author.name,
				picture: allCases[0].author.picture
			}
			res.render('profile', { result })
		}
	})
})

// marks user as deleted
router.post('/:id/delete', async (req: any, res) => {

	const { user_id } = req.user

	let user_idClean = sanitizeInput(user_id)

	const result = await Users.update({ userId: user_idClean }, { isDeleted: true })

	res.render('profile', { result })
})

export default router
