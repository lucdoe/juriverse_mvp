import express, { json } from 'express'
import morgan from 'morgan'
import path from 'path'
import hbs from 'hbs'
import helmet from 'helmet'
import dotenv from 'dotenv'
dotenv.config()
import MongoClient from 'mongodb'

import indexRouter from './routes/'
import followingRouter from './routes/following'
import savedRouter from './routes/saved'
import historyRouter from './routes/history'
import crudRouter from './routes/crud'
import caseRouter from './routes/case'
import uploadRouter from './routes/upload'

const app = express()

// kDLtUkCE1OcTT2Ap!

app.set('view engine', 'html')
app.engine('html', hbs.__express)
app.set('views', path.join(__dirname, 'views'))

app.use(helmet())
app.use(morgan('dev'))
app.use(json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/following', followingRouter)
app.use('/saved', savedRouter)
app.use('/history', historyRouter)
app.use('/crud', crudRouter)
app.use('/case', caseRouter)
app.use('/upload', uploadRouter)

MongoClient.connect(
	process.env.URI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, dbConnection) => {
		if (err) throw err
		return dbConnection.db('juriversedev')
	}
)

export default app
