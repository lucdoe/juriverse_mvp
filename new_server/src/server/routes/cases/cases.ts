import { Router, Request, Response } from 'express'
import Cases from '../../models/Case'
import Users from '../../models/User'

const router = Router()

// get all cases
router.get('/', async (req: Request, res: Response) => {
	const search = req.query.searchInput
	if (search) {
		const regex = new RegExp(escapeRegex(search), 'gi')
		Cases.find({
			$or: [
				{ 'case.title': regex },
				{ categories: regex },
				{ subcategories: regex },
				{ problems: regex },
				{ 'author.name': regex },]
		},

			(err, result) => {
				if (err) {
					console.log(err)
				} else {
					if (result.length < 1) {
						const noMatch = 'Kein Fall nach deinen Suchkriterien gefunden.'
						res.render('listCases', { result, noMatch })
					}
					res.render('listCases', { result })
				}
			}
		)
	} else {
		const recommendedCases = await Cases.find({ $and: [{ 'meta.recommended': { $gt: 980 } }, { $or: [{ 'meta.public': true }, { 'meta.draft': false }] }] })
		const allCases = await Cases.find({ $or: [{ 'meta.public': true }, { 'meta.draft': false }] })
		const result = {
			recommendedCases,
			allCases
		}
		res.render('listCases', { result })
	}
})

// get one case
router.get('/:id', async (req: Request, res: Response) => {
	const id = req.params.id
	const result = await Cases.findOne({ id })
	res.render('listCases', { result })
})

// get case by cats/subcats/problems
router.get('/:categories/:subcategories/?problems=', async (req: Request, res: Response) => {
	const { categories, subcategories } = req.params
	const { problems } = req.query
	const recommendedCases = await Cases.find({ $and: [{ categories }, { subcategories }, { problems }, { 'meta.rating': { $gt: 980 } }] })
	const allCases = await Cases.find({ $and: [{ categories }, { subcategories }, { problems }] })
	const result = {
		recommendedCases,
		allCases
	}
	res.render('listCases', { result })
})

// marks case as done
router.post('/:id/done', async (req: any, res: Response) => {
	const { user_id } = req.user
	const { id } = req.params
	const user = Users.updateOne({ user_id }, { $push: { 'cases.finished': id } })
	const allCases = Cases.find({ 'author.author_id': user_id })
	const result = {
		user,
		allCases
	}
	res.render('profile', { result })
})

// update case
router.post('/:id/update', async (req: Request, res: Response) => {
	const { id } = req.params
	const data = req.body
	const result = await Cases.updateOne({ case_id: id }, { data })
	res.render('case', { result })
})

// report case
router.post('/:id/report', async (req: any, res: Response) => {
	const { user_id } = req.user
	const { id } = req.params
	const { reportText } = req.body
	const report = await Cases.updateOne({ case_id: id }, { $push: { report: { user_id, case_id: id, reportText } } })
	const result = {
		report
	}
	res.render('case', { result })
})

// delete case
router.post('/:id/delete', async (req: Request, res: Response) => {
	const { id } = req.params
	const deleted = await Cases.updateOne({ case_id: id }, { isDeleted: true })
	const result = await Cases.find({})
	res.render('caseList', { result, deleted })
})

// /cases/text - creates case
router.post('/:id/text', async (req: Request, res: Response) => {
	const { id } = req.params
	const { title, sachverhalt, aufgabe, musterloesung, fussnoten } = req.body
	const result = await Cases.updateOne({ case_id: id }, { title, sachverhalt, aufgabe, musterloesung, fussnoten })
	res.render('case', { result })
})

// update case details
router.post('/:id/details', async (req: Request, res: Response) => {
	const { id } = req.params
	const { categories, subcategories, problems } = req.body
	const result = await Cases.updateOne({ case_id: id }, { categories, subcategories, problems })
	res.render('case', { result })
})

const escapeRegex = (text) => {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

export default router
