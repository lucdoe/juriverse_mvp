import { Router, Request, Response } from 'express'
import Cases from '../../models/Case'
import Users from '../../models/User'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

// get all cases
router.get('/', async (req: Request, res: Response) => {
	const search = req.query.si
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

			(err, data) => {
				if (err) {
					console.log(err)
				} else {
					if (data.length < 1) {
						const noMatch = 'Kein Fall nach deinen Suchkriterien gefunden.'
						res.render('listCases', { noMatch })
					}
					const result = {
						search: data,
						category: 'Suche'
					}
					res.render('listCases', { result })
				}
			}
		)
	} else {
		const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: 917 } }, { $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] }] })
		const allCases: any = await Cases.find({ $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] })
		const result = {
			recommendedCases,
			allCases,
			category: 'Dashboard'
		}
		res.render('listCases', { result })
	}
})


// get text edit page
router.get('/:id/text', async (req: any, res: Response) => {
	const id = req.params.id
	const oneCase = await Cases.findOne({ caseId: id })
	const result = {
		oneCase,
		id
	}
	res.render('uploadCaseText', { result })
})

// get text edit page
router.get('/:id/report', async (req: any, res: Response) => {
	const id = req.params.id
	const oneCase = await Cases.findOne({ caseId: id })
	const result = {
		oneCase,
		id
	}
	res.render('report', { result })
})

// comes from caseDetails, creates case renders case page
router.post('/:id/view', async (req: Request, res: Response) => {
	const { caseId, categories, subcategories, problems } = req.body
	await Cases.update({ caseId }, { categories, subcategories, problems, 'meta.isPublished': true, 'meta.isDraft': false })
	const result = await Cases.findOne({ caseId })
	res.render('case', { result })
})

// get one case
router.get('/:id/view', async (req: Request, res: Response) => {
	const id = req.params.id
	const result = await Cases.findOne({ caseId: id })
	res.render('case', { result })
})

// marks case as done
router.post('/:id/done', async (req: any, res: Response) => {
	const { user_id } = req.user
	const { id } = req.params
	await Users.updateOne({ userId: user_id }, { $push: { 'cases.finished': { caseId: id, finishedTimestamp: Date.now() } } }, (err, data) => {
		res.redirect('/cases')
	})
})

// publish case
router.post('/:id/publish', async (req: any, res: Response) => {
	const { id } = req.params
	const update = await Cases.updateOne({ caseId: id }, { 'meta.isPublished': true, 'meta.isDraft': false })
	const result = {
		update,
	}
	res.redirect('../../../upload')
})

// publish case
router.post('/:id/unpublish', async (req: any, res: Response) => {
	const { id } = req.params
	const update = await Cases.updateOne({ caseId: id }, { 'meta.isPublished': false, 'meta.isDraft': true })
	// const publicCases = await Cases.find({ $and: [{ 'meta.isPublished': true }, { 'author.authorId': user_id }] })
	// const draftCases = await Cases.find({ $and: [{ 'meta.isPublished': false }, { 'meta.isDraft': true }, { 'author.authorId': user_id }] })
	const result = {
		update,
	}
	res.redirect('../../../upload')
})

// report case
router.post('/:id/report', async (req: any, res: Response) => {
	const { user_id } = req.user
	const { id } = req.params
	const { reportText } = req.body
	const report = await Cases.updateOne({ caseId: id }, { $push: { report: [{ userId: user_id, caseId: id, reportText }] } })
	const result = await Cases.findOne({ caseId: id })
	res.render('case', { result, report })
})

// delete case
router.post('/:id/delete', async (req: Request, res: Response) => {
	const { id } = req.params
	const deleted = await Cases.updateOne({ caseId: id }, { isDeleted: true })
	const allCases: any = await Cases.find({ $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] })
	const result = {
		deleted,
		allCases
	}
	res.render('caseList', { result })
})

// /cases/text - creates case
router.post('/:id/text', async (req: any, res: Response) => {
	const caseId = req.params.id
	const { user_id, picture, email, nickname } = req.user
	const { title, issue, task, solution, footnotes } = req.body

	if (+caseId == 0) {
		let caseId = uuidv4()
		const data = {
			caseId,
			author: {
				authorId: user_id,
				picture,
				name: nickname,
				email,
				university: '',
			},
			case: {
				title,
				task,
				issue,
				solution,
				footnotes,
			},
			meta: {
				likeCount: 0,
				ratingCount: 0,
				viewCount: 0,
				editorChoice: [],
				isPublished: false,
				isDraft: true,
				isDeleted: false,
				uploadDate: '',
				length: 0,
				intro: '',
			},
			report: [
				{
					userId: '',
					caseId: '',
					reportText: ''
				}
			],
			selfWriteConfirm: false,
		}
		const result = Cases.create(data)
		res.render('uploadCaseDetails', { result, caseId })
	} else {
		const { id } = req.params
		const { title, issue, task, solution, footnotes } = req.body
		const result = await Cases.updateOne({ caseId: id }, { title, issue, task, solution, footnotes })
		res.render('case', { result })
	}
})

// update case details
router.post('/:id/details', async (req: Request, res: Response) => {
	const { id } = req.params
	const { categories, subcategories, problems } = req.body
	const result = await Cases.updateOne({ caseId: id }, { categories, subcategories, problems, 'meta.isPublished': true, 'meta.isDraft': false })
	console.log(result)
	res.redirect(`/cases/${result.caseId}/view`)
})

const escapeRegex = (text) => {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

export default router
