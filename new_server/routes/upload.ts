const express = require('express')
const MongoClient = require('mongodb').MongoClient
const url =
	'mongodb+srv://juradmin:kDLtUkCE1OcTT2Ap!@juriversedev0.nl0jy.mongodb.net/juriversedev?retryWrites=true&w=majority'
const bodyParser = require('body-parser')

const router = express.Router()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// GET home page.
router.get('/', (req, res) => {
	res.render('upload')
})

router.post('/insert', urlencodedParser, (req, res) => {
	MongoClient.connect(url, (err, db) => {
		if (err) throw err
		const dbObject = db.db('juriversedev')

		const objToInsert = {
			author: {
				name: req.body.authorName,
				university: req.body.uni,
			},
			name: req.body.caseName,
			case: {
				content: req.body.caseContent,
				question: req.body.caseQuestion,
				solution: req.body.caseSolution,
			},
		}

		// first parameter of the insertOne() method is an object containing
		// value(s) of each field in the document (docToInsert)
		dbObject.collection('juriversedev').insertOne(objToInsert, (err, result) => {
			if (err) throw err
			console.log('1 document inserted')
			db.close()
			res.render('upload')
		})
	})
})

export default router
