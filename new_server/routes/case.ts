import { Router, Request, Response, NextFunction } from 'express'
import { MongoClient, MongoError } from 'mongodb'
const url =
	'mongodb+srv://juradmin:kDLtUkCE1OcTT2Ap!@juriversedev0.nl0jy.mongodb.net/juriversedev?retryWrites=true&w=majority'

const router = Router()

// GET home page.
router.get('/:name', (req: Request, res: Response, next: NextFunction) => {
	const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
	MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
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
			.findOne({ name: req.params.name }, {}, (error: Error | String | Object, result: any) => {
				console.log(result)
				if (error) throw err
				res.render('case', { cases: result })
			})
	})
})

export default router
