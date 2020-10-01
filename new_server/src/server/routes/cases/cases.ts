import { Router, Request, Response } from 'express'
import Cases from '../../models/Case'
import Users from '../../models/User'


import { v4 as uuidv4 } from 'uuid'
import DOMPurify from '../../middlewares/sanitizer'
import { escapeRegex } from '../../helpers/escapeRegex'
import { safelyParseJSON } from '../../helpers/parseJSON'
import { getWordCount } from '../../helpers/getWordCount'
import { readTime } from '../../helpers/calculateReadTime'


const router = Router()


// get all cases
router.get('/', async (req: Request, res: Response) => {

	const searchRaw = req.query.si
	let search = DOMPurify.sanitize(searchRaw)

	if (search) {
		const regex = new RegExp(await escapeRegex(search), 'gi')
		const query = {
			$and: [
				{ $or: [{ 'case.title': regex }, { categories: regex }, { subcategories: regex }, { problems: regex, }, { 'author.name': regex }] },
				{ $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] },
				{ 'meta.isDeleted': false }
			]
		}
		await Cases.find(query,
			async (err, data) => {
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
			const noMatch = 'Es wurde noch kein Fall hochgeladen.'
			const result = {
				noMatch,
				category: 'Dashboard'
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

	const caseIdRaw = req.params.id

	const caseId = DOMPurify.sanitize(caseIdRaw)

	const oneCase = await Cases.findOne({ caseId })

	const result = {
		oneCase,
		caseId
	}
	res.render('uploadCaseText', { result })
})


// get text edit page
router.get('/:id/report', async (req: any, res: Response) => {

	const idRaw = req.params.id

	const id = DOMPurify.sanitize(idRaw)

	const oneCase = await Cases.findOne({ caseId: id })

	const result = {
		oneCase,
		id
	}
	res.render('report', { result })
})


// get one case
router.get('/:id/view', async (req: Request, res: Response) => {

	const idRaw = req.params.id
	const id = DOMPurify.sanitize(idRaw)

	const result: any = await Cases.findOne({ caseId: id })
	const recommended = await Cases.find({ $and: [{ $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] }, { 'meta.ratingCount': { $gt: 750 } }, { 'meta.isDeleted': false }, { subcategories: result.subcategories }] })

	res.render('case', { result, recommended })
})


// comes from caseDetails, creates case renders case page
router.post('/:id/view', async (req: Request, res: Response) => {

	const { caseId, categories, subcategories, problems } = req.body

	const caseIdClean = DOMPurify.sanitize(caseId)
	const categoriesClean = DOMPurify.sanitize(categories)
	const subcategoriesClean = DOMPurify.sanitize(subcategories)
	const problemsClean = DOMPurify.sanitize(problems)

	await Cases.update({ caseIdClean }, { categoriesClean, subcategoriesClean, problemsClean, 'meta.isPublished': true, 'meta.isDraft': false })
	const result = await Cases.findOne({ caseId })

	res.render('case', { result })
})


// marks case as done
router.post('/:id/done', async (req: any, res: Response) => {

	const { user_id } = req.user
	const { id } = req.params

	const userIdClean = DOMPurify.sanitize(user_id)
	const caseIdClean = DOMPurify.sanitize(id)

	await Users.updateOne({ userId: userIdClean }, { $push: { 'cases.finished': { caseId: caseIdClean, finishedTimestamp: Date.now() } } }, async (err, data) => {
		res.redirect('/cases')
	})
})


// publish case
router.post('/:id/publish', async (req: any, res: Response) => {

	const { id } = req.params
	const { user_id } = req.user

	const caseIdClean = DOMPurify.sanitize(id)
	const userIdClean = DOMPurify.sanitize(user_id)

	const change = await Cases.updateOne({ caseId: caseIdClean }, { $set: { 'meta.isPublished': true, 'meta.isDraft': false } })
	const publicCases = await Cases.find({ $and: [{ 'meta.isPublished': true }, { 'meta.isDeleted': false }, { 'author.authorId': userIdClean }] })
	const draftCases = await Cases.find({ $and: [{ 'meta.isDraft': true }, { 'meta.isDeleted': false }, { 'author.authorId': userIdClean }] })

	const result = {
		publicCases,
		draftCases,
		userId: userIdClean,
		change
	}
	res.render('yourCases', { result })
})


// publish case
router.post('/:id/unpublish', async (req: any, res: Response) => {

	const { id } = req.params
	const { user_id } = req.user

	const caseIdClean = DOMPurify.sanitize(id)
	const userIdClean = DOMPurify.sanitize(user_id)

	const change = await Cases.updateOne({ caseId: caseIdClean }, { $set: { 'meta.isPublished': false, 'meta.isDraft': true } })
	const publicCases = await Cases.find({ $and: [{ 'meta.isPublished': true }, { 'meta.isDeleted': false }, { 'author.authorId': userIdClean }] })
	const draftCases = await Cases.find({ $and: [{ 'meta.isDraft': true }, { 'meta.isDeleted': false }, { 'author.authorId': userIdClean }] })

	const result = {
		publicCases,
		draftCases,
		userId: userIdClean,
		change
	}
	res.render('yourCases', { result })
})


// report case
router.post('/:id/report', async (req: any, res: Response) => {

	const { user_id } = req.user
	const { id } = req.params
	const { reportText } = req.body

	const caseIdClean = DOMPurify.sanitize(id)
	const userIdClean = DOMPurify.sanitize(user_id)
	const reportTextClean = DOMPurify.sanitize(reportText)

	const report = await Cases.updateOne({ caseId: caseIdClean }, { $push: { report: [{ userId: userIdClean, caseId: caseIdClean, reportText: reportTextClean }] } })
	const result = await Cases.findOne({ caseId: caseIdClean })

	res.render('case', { result, report })
})


// report case
router.get('/:id/like', async (req: any, res: Response) => {

	const { id } = req.params

	const caseIdClean = DOMPurify.sanitize(id)

	const like = await Cases.updateOne({ caseId: caseIdClean }, { $inc: { 'meta.likeCount': 1 } })
	const result = await Cases.findOne({ caseId: caseIdClean })

	res.render('case', { result, like })
})


// delete case
router.post('/:id/delete', async (req: any, res: Response) => {

	const { id } = req.params

	const caseIdClean = DOMPurify.sanitize(id)

	await Cases.updateOne({ caseId: caseIdClean }, { 'meta.isDeleted': true })

	res.redirect('/upload')
})


// /cases/text - creates case
router.post('/:id/text', async (req: any, res: Response) => {

	const caseId = req.params.id
	const { user_id, picture, emails, nickname } = req.user
	const { title, issue, task, solution, footnotes } = req.body

	const caseIdClean = DOMPurify.sanitize(caseId)
	const titleClean = DOMPurify.sanitize(title)
	const user_idClean = DOMPurify.sanitize(user_id)
	const pictureClean = DOMPurify.sanitize(picture)
	const emailClean = DOMPurify.sanitize(emails[0].value)
	const nicknameClean = DOMPurify.sanitize(nickname)

	const findUser: any = Users.findOne({ userId: user_idClean })

	if (!titleClean) {

		let result = {
			error: 'Wählen Sie bitte einen Titel für ihren Fall aus.',
			caseId: caseIdClean
		}
		res.render('uploadCaseText', { result })
	}

	if (+caseIdClean == 0) {

		let caseId = uuidv4()
		const data = {
			caseId,
			author: {
				authorId: user_idClean,
				picture: pictureClean,
				name: nicknameClean || findUser.screenname,
				email: emailClean,
				university: findUser.university,
			},
			case: {
				title: titleClean,
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
				uploadDate: Date.now(),
				wordCount: getWordCount(title, issue, task, solution, footnotes),
				readTime: readTime(getWordCount(title, issue, task, solution, footnotes)),
				intro: task.substring(0, 100),
			},
			report: [
				{
					userId: '0',
					caseId: '0',
					reportText: ''
				}
			],
			selfWriteConfirm: false,
		}

		const cases: any = await Cases.create(data)

		const result = {
			cases,
			caseId
		}
		res.render('uploadCaseDetails', { result })

	} else {

		const cases = await Cases.updateOne({ caseIdClean }, { 'case.title': titleClean, 'case.issue': issue, 'case.task': task, 'case.solution': solution, 'case.footnotes': footnotes })

		const result = {
			cases,
			caseId: caseIdClean
		}
		res.render('uploadCaseDetails', { result })
	}
})

// update case details
router.post('/:id/details', async (req: Request, res: Response) => {

	const { id } = req.params
	const { categorie, subcategories, tags } = req.body

	const caseIdClean = DOMPurify.sanitize(id)
	const categorieClean = DOMPurify.sanitize(categorie)
	const subcategoriesClean = DOMPurify.sanitize(subcategories)
	const tagsClean = DOMPurify.sanitize(tags)

	if (!subcategoriesClean || !tagsClean) {
		let result = {
			error: 'Wählen Sie mehr als ein Teilgebiet und oder Problem aus.',
			caseId: caseIdClean
		}
		res.render('uploadCaseDetails', { result })
	}

	let tagsArray = []
	const problems = safelyParseJSON(tagsClean)
	problems.forEach(element => {
		tagsArray.push(element.value)
	})

	const subcategoriesArray = subcategoriesClean.split(",");

	await Cases.updateOne({ caseId: caseIdClean }, { categories: categorieClean, 'meta.isDraft': false, 'meta.isPublished': true, subcategories: subcategoriesArray, problems: tagsArray })

	res.redirect(`/cases/${caseIdClean}/view`)
})


export default router
