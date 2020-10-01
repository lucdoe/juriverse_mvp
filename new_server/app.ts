import express, { json } from 'express'
import path from 'path'
import Handlebars from 'handlebars'
import exphbs from 'express-handlebars'
import helmet from 'helmet'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import session from 'express-session'
import passport from 'passport'
import winston from 'winston'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'


dotenv.config()


import indexRouter from './src/server/routes/index'
import casesRouter from './src/server/routes/cases/cases'
import authRouter from './src/server/routes/auth'
import usersRouter from './src/server/routes/users'
import publiclawRouter from './src/server/routes/cases/publiclaw'
import criminallawRouter from './src/server/routes/cases/criminallaw'
import civillawRouter from './src/server/routes/cases/civillaw'
import uploadRouter from './src/server/routes/upload'
import editRouter from './src/server/routes/edit'


import { secured } from './src/server/middlewares/secured'
import { userInViews } from './src/server/middlewares/userInViews'


import { sess } from './src/server/helpers/session'
import { strategy } from './src/server/helpers/passport'


const app = express()


const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: { service: 'user-service' },
	transports: [
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.File({ filename: 'combined.log' }),
	],
	exceptionHandlers: [
		new winston.transports.File({ filename: 'exceptions.log' })
	]
});
if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		format: winston.format.simple(),
	}));
}


passport.use(strategy)
passport.serializeUser((user, done) => { done(null, user) })
passport.deserializeUser((user, done) => { done(null, user) })


app.use(session(sess))
app.use(passport.initialize())
app.use(passport.session())
app.use(userInViews())


app.engine('.hbs', exphbs({ extname: '.hbs', handlebars: allowInsecurePrototypeAccess(Handlebars), layoutsDir: `${__dirname}/src/client/views` }))
app.set('view engine', '.hbs');
app.set('views', (path.join(__dirname + '/src/client/views')))
app.use(express.static(path.join(__dirname + '/src/client/', 'public')))
app.use(helmet({ contentSecurityPolicy: false }))
app.use(json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/', indexRouter)
app.use('/', authRouter)
app.use('/users', secured, usersRouter)
app.use('/cases', secured, casesRouter)
app.use('/cases/publiclaw', secured, publiclawRouter)
app.use('/cases/criminallaw', secured, criminallawRouter)
app.use('/cases/civillaw', secured, civillawRouter)
app.use('/upload', secured, uploadRouter)
app.use('/edit', secured, editRouter)


export default app
