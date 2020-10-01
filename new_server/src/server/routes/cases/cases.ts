import { Router, Request, Response } from 'express'
import Cases from '../../models/Case'


import { v4 as uuidv4 } from 'uuid'
import { escapeRegex } from '../../helpers/escapeRegex'
import { safelyParseJSON } from '../../helpers/parseJSON'
import { getWordCount } from '../../helpers/getWordCount'
import { readTime } from '../../helpers/calculateReadTime'
import { findCases, findOneCase } from '../../helpers/casesHelper'
import { allCasesQuery, draftCasesQuery, fuzzySearch, publicCasesQuery, recommandationQuery, suggestQuerySubcat } from '../../helpers/queries'
import { findOneUser } from '../../helpers/usersHelper'
import { sanitizeInput } from '../../middlewares/sanitizer'


const router = Router()


// get all cases
router.get('/', async (req: Request, res: Response) => {

	const searchRaw = req.query.si

	let searchClean = sanitizeInput(searchRaw)

	if (searchClean) {

		const regex = new RegExp(await escapeRegex(searchClean), 'gi')
		const data = await findCases(fuzzySearch(regex))

		if (data.length == 0) {

			const noMatch = `Es wurde kein Fall nach deinen Suchkriterien: '${searchClean}' gefunden.`
			const result = {
				query: searchClean,
				noMatch,
				category: 'Suche'
			}
			res.render('listCases', { result })

		} else {

			const result = {
				query: searchClean,
				search: data,
				category: 'Suche',
			}
			res.render('listCases', { result })

		}
	} else {

		const recommendedCases = await findCases(recommandationQuery)
		const allCases: any = await findCases(allCasesQuery)

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

	const caseId = sanitizeInput(caseIdRaw)

	const oneCase = await findOneCase(caseId)

	const result = {
		oneCase,
		caseId
	}
	res.render('uploadCaseText', { result })
})


// get text edit page
router.get('/:id/report', async (req: any, res: Response) => {

	const idRaw = req.params.id

	const id = sanitizeInput(idRaw)

	const oneCase = await findOneCase(id)

	const result = {
		oneCase,
		id
	}
	res.render('report', { result })
})


// get one case
router.get('/:id/view', async (req: Request, res: Response) => {

	const idRaw = req.params.id
	const id = sanitizeInput(idRaw)

	const result: any = await findOneCase(id)
	const recommended = await findCases(suggestQuerySubcat(result.subcategories))

	res.render('case', { result, recommended })
})


// comes from caseDetails, creates case renders case page
router.post('/:id/view', async (req: Request, res: Response) => {

	const { id } = req.params

	const caseIdClean = sanitizeInput(id)

	const result = await findOneCase(caseIdClean)

	res.render('case', { result })
})


// marks case as done
router.post('/:id/done', async (req: any, res: Response) => {

	const { user_id } = req.user
	const { id } = req.params

	const userIdClean = sanitizeInput(user_id)
	const caseIdClean = sanitizeInput(id)

	const fieldsToUpdate = { $push: { 'cases.finished': { caseId: caseIdClean, finishedTimestamp: Date.now() } } }
	await await Cases.updateOne({ userId: userIdClean }, fieldsToUpdate)

	res.redirect('/cases')
})


// publish case
router.post('/:id/publish', async (req: any, res: Response) => {

	const { id } = req.params
	const { user_id } = req.user

	const caseIdClean = sanitizeInput(id)
	const userIdClean = sanitizeInput(user_id)

	const fieldsToUpdate = { $set: { 'meta.isPublished': true, 'meta.isDraft': false } }
	const change = await Cases.updateOne({ caseId: caseIdClean }, fieldsToUpdate)

	const publicCases = await findCases(publicCasesQuery(userIdClean))
	const draftCases = await findCases(draftCasesQuery(userIdClean))

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

	const caseIdClean = sanitizeInput(id)
	const userIdClean = sanitizeInput(user_id)

	const fieldsToUpdate = { $set: { 'meta.isPublished': false, 'meta.isDraft': true } }
	const change = await Cases.updateOne({ caseId: caseIdClean }, fieldsToUpdate)

	const publicCases = await findCases(publicCasesQuery(userIdClean))
	const draftCases = await findCases(draftCasesQuery(userIdClean))

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

	const caseIdClean = sanitizeInput(id)
	const userIdClean = sanitizeInput(user_id)
	const reportTextClean = sanitizeInput(reportText)

	const fieldsToUpdate = { $push: { report: [{ userId: userIdClean, caseId: caseIdClean, reportText: reportTextClean }] } }
	const report = await Cases.updateOne({ caseId: caseIdClean }, fieldsToUpdate)

	const result = await findOneCase(caseIdClean)

	res.render('case', { result, report })
})


// report case
router.get('/:id/like', async (req: any, res: Response) => {

	const { id } = req.params

	const caseIdClean = sanitizeInput(id)

	const fieldsToUpdate = { $inc: { 'meta.likeCount': 1 } }
	const like = await Cases.updateOne({ caseId: caseIdClean }, fieldsToUpdate)

	const result = await findOneCase(caseIdClean)

	res.render('case', { result, like })
})


// delete case
router.post('/:id/delete', async (req: any, res: Response) => {

	const { id } = req.params

	const caseIdClean = sanitizeInput(id)

	const fieldsToUpdate = { 'meta.isDeleted': true }
	await Cases.updateOne({ caseId: caseIdClean }, fieldsToUpdate)

	res.redirect('/upload')
})


// /cases/text - creates case
router.post('/:id/text', async (req: any, res: Response) => {

	const caseId = req.params.id
	const { user_id, picture, emails, nickname } = req.user
	const { title, issue, task, solution, footnotes } = req.body

	const caseIdClean = sanitizeInput(caseId)
	const titleClean = sanitizeInput(title)
	const user_idClean = sanitizeInput(user_id)
	const pictureClean = sanitizeInput(picture)
	const emailClean = sanitizeInput(emails[0].value)
	const nicknameClean = sanitizeInput(nickname)

	const findUser: any = findOneUser(user_idClean)

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
			categories: [],
			subcategories: [],
			problems: [],
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

		await Cases.create(data)
		const cases: any = await findOneCase(caseId)

		const result = {
			cases,
			subcategories: cases.subcategories,
			caseId
		}
		res.render('uploadCaseDetails', { result })

	} else {

		const fieldsToUpdate = { 'case.title': titleClean, 'case.issue': issue, 'case.task': task, 'case.solution': solution, 'case.footnotes': footnotes }
		await Cases.updateOne({ caseId: caseIdClean }, fieldsToUpdate)

		const cases: any = await findOneCase(caseIdClean)

		const result = {
			cases,
			subcategories: cases.subcategories,
			caseId: caseIdClean
		}
		res.render('uploadCaseDetails', { result })
	}
})

// update case details
router.post('/:id/details', async (req: Request, res: Response) => {

	const { id } = req.params
	const { categorie, subcategories, tags } = req.body

	const caseIdClean = sanitizeInput(id)
	const categorieClean = sanitizeInput(categorie)
	const subcategoriesClean = sanitizeInput(subcategories)
	const tagsClean = sanitizeInput(tags)

	const cases: any = await findOneCase(caseIdClean)

	if (!subcategoriesClean || !tagsClean) {
		let result = {
			error: 'Wählen Sie mehr als ein Teilgebiet und oder Problem aus.',
			subcategories: cases.subcategories,
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

	const fieldsToUpdate = { categories: categorieClean, 'meta.isDraft': false, 'meta.isPublished': true, subcategories: subcategoriesArray, problems: tagsArray }
	await Cases.updateOne({ caseId: caseIdClean }, fieldsToUpdate)

	res.redirect(`/cases/${caseIdClean}/view`)
})


export default router
