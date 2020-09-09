import express, { json } from 'express'
import morgan from 'morgan'
import path from 'path'
import hbs from 'hbs'
import helmet from 'helmet'
import dotenv from 'dotenv'
dotenv.config()

import indexRouter from './routes/'
import caseRouter from './routes/case'

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
app.use('/cases', caseRouter)
app.use('/cases/zivilrecht')

export default app
