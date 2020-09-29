import { Router, Request, Response, json } from 'express'
import Cases from '../../models/Case'
import Users from '../../models/User'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

// get all cases
router.get('/', async (req: Request, res: Response) => {

	const search = req.query.si
	if (search) {
		const regex = new RegExp(escapeRegex(search), 'gi')
		const query = {
			$and: [
				{ $or: [{ 'case.title': regex }, { categories: regex }, { subcategories: regex }, { problems: regex, }, { 'author.name': regex }] },
				{ $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] },
				{ 'meta.isDeleted': false }
			]
		}
		Cases.find(query,
			(err, data) => {
				if (data.length == 0) {
					const noMatch = `Es wurde kein Fall nach deinen Suchkriterien: '${search}' gefunden.`
					const result = {
						query: search,
						noMatch,
						category: 'Suche'
					}
					res.render('listCases', { result })
				} else {
					const result = {
						query: search,
						search: data,
						category: 'Suche',
					}
					res.render('listCases', { result })
				}
			}
		)
	} else {
		const recommendedCases = await Cases.find({ $and: [{ 'meta.ratingCount': { $gt: 980 } }, { 'meta.isDeleted': false }, { $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] }] })
		const allCases: any = await Cases.find({ $and: [{ $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] }, { 'meta.isDeleted': false }] })

		if (allCases.length == 0) {
			const noMatch = 'Hier gibt es leider noch keinen Fall.'
			const result = {
				noMatch,
				category: 'Dashboard - Coming soon!'
			}
			res.render('listCases', { result })
		} else {
			const result = {
				recommendedCases,
				allCases,
				category: 'Dashboard',

			}
			res.render('listCases', { result })
		}
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

// get one case
router.get('/:id/view', async (req: Request, res: Response) => {
	const id = req.params.id
	const result: any = await Cases.findOne({ caseId: id })
	const recommended = await Cases.find({ $and: [{ $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] }, { 'meta.ratingCount': { $gt: 750 } }, { 'meta.isDeleted': false }, { subcategories: result.subcategories }] })
	res.render('case', { result, recommended })
})

// comes from caseDetails, creates case renders case page
router.post('/:id/view', async (req: Request, res: Response) => {
	const { caseId, categories, subcategories, problems } = req.body
	await Cases.update({ caseId }, { categories, subcategories, problems, 'meta.isPublished': true, 'meta.isDraft': false })
	const result = await Cases.findOne({ caseId })
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

// report case
router.get('/:id/like', async (req: any, res: Response) => {
	const { id } = req.params
	const like = await Cases.updateOne({ caseId: id }, { $inc: { 'meta.likeCount': 1 } })
	const result = await Cases.findOne({ caseId: id })
	res.render('case', { result, like })
})

// delete case
router.post('/:id/delete', async (req: any, res: Response) => {
	const { id } = req.params
	await Cases.updateOne({ caseId: id }, { 'meta.isDeleted': true })
	res.redirect('/upload')
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
		const result: any = Cases.create(data)
		res.render('uploadCaseDetails', { result, caseId })
	} else {
		const result = await Cases.updateOne({ caseId }, { 'case.title': title, 'case.issue': issue, 'case.task': task, 'case.solution': solution, 'case.footnotes': footnotes })
		res.render('uploadCaseDetails', { result, caseId })
	}
})

// update case details
router.post('/:id/details', async (req: Request, res: Response) => {
	const { id } = req.params
	const { categorie, subcategories, tags } = req.body
	if (!subcategories || !tags) {
		let result = {
			error: 'Wählen Sie bitte mehr als ein Teilgebiet & Problem aus.'
		}
		res.render('uploadCaseDetails', { result })
	}
	let tagsArray = []
	const tagsPlain: any = JSON.parse(tags)
	tagsPlain.forEach(element => {
		tagsArray.push(element.value)
	});
	await Cases.updateOne({ caseId: id }, { categories: categorie, $push: { subcategories: subcategories, problems: tagsArray }, 'meta.isDraft': false, 'meta.isPublic': true })
	res.redirect(`/cases/${id}/view`)
})

const escapeRegex = (text) => {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

export default router
