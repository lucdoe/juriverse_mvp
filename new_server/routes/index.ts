import { Router } from 'express'
const MongoClient = require('mongodb').MongoClient
const url =
	'mongodb+srv://juradmin:kDLtUkCE1OcTT2Ap!@juriversedev0.nl0jy.mongodb.net/juriversedev?retryWrites=true&w=majority'
import assert from 'assert'

const router = Router()

// GET home page.
router.get('/', (req, res) => {
	MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err
		const dbObject = db.db('juriversedev')
		/*
        first parameter of the find() method is a query object (in this example empty), 
        and is also used to limit the search e.g. { address: "Park Lane 38" }
        second parameter of the find() method is the projection object that describes which fields to include
        e.g. , { projection: { _id: 0, name: 1, address: 1 } }
        */
		dbObject
			.collection('juriversedev')
			.find({})
			.toArray((err, result) => {
				if (err) throw err
				res.render('index', { cases: result })
			})
	})
})

// GET home page.
router.get('/search', (req, res, next) => {
	MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
		const dbObject = db.db('testDB')
		const userSearch = req.body.searchBox

		// first parameter of the find() method is a query object (in this example empty),
		// and is also used to limit the search e.g. { address: "Park Lane 38" }
		// second parameter of the find() method is the projection object that describes which fields to include
		// e.g. , { projection: { _id: 0, name: 1, address: 1 } }
		dbObject
			.collection('cases')
			.find({}, { projection: { _id: 0, name: 1, author: 1, tags: 1 } })
			.toArray(
				(err, result) => {
					if (err) throw err
					res.render('index', { caseSearch: result })
					console.log(result)
				},
				() => {
					db.close()
				}
			)
	})
})

export default router
