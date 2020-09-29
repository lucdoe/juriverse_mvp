// import dependencys/ modules
import express, { json } from 'express'
import path from 'path'
import Handlebars from 'handlebars'
import exphbs from 'express-handlebars'
import helmet from 'helmet'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import session from 'express-session'
import passport from 'passport'
import Auth0Strategy from 'passport-auth0'
import winston from 'winston'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'

dotenv.config()

// importing router
import indexRouter from './src/server/routes/index'
import casesRouter from './src/server/routes/cases/cases'
import authRouter from './src/server/routes/auth'
import usersRouter from './src/server/routes/users'
import publiclawRouter from './src/server/routes/cases/publiclaw'
import criminallawRouter from './src/server/routes/cases/criminallaw'
import civillawRouter from './src/server/routes/cases/civillaw'
import uploadRouter from './src/server/routes/upload'
import editRouter from './src/server/routes/edit'

// importing middleware
import { secured } from './src/server/middlewares/secured'
import { userInViews } from './src/server/middlewares/userInViews'

const app = express()

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: { service: 'user-service' },
	transports: [
		//
		// - Write all logs with level `error` and below to `error.log`
		// - Write all logs with level `info` and below to `combined.log`
		//
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.File({ filename: 'combined.log' }),
	],
	exceptionHandlers: [
		new winston.transports.File({ filename: 'exceptions.log' })
	]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		format: winston.format.simple(),
	}));
}

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
	{
		domain: process.env.AUTH0_DOMAIN,
		clientID: process.env.AUTH0_CLIENT_ID,
		clientSecret: process.env.AUTH0_CLIENT_SECRET,
		callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:2907/callback',
	},
	(accessToken, refreshToken, extraParams, profile, done) => {
		// accessToken is the token to call Auth0 API (not needed in the most cases)
		// extraParams.id_token has the JSON Web Token
		// profile has all the information from the user
		return done(null, profile)
	}
)

passport.use(strategy)

// config express-session
const sess = {
	secret: process.env.session_secret,
	cookie: {},
	resave: false,
	saveUninitialized: true,
}

if (process.env.NODE_ENV === 'production') {
	// Use secure cookies in production (requires SSL/TLS)
	sess.cookie = true

	// Uncomment the line below if your application is behind a proxy (like on Heroku)
	// or if you're encountering the error message:
	// "Unable to verify authorization request state"
	app.set('trust proxy', 1);
}

// You can use this section to keep a smaller payload
passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((user, done) => {
	done(null, user)
})

// auth0 related
app.use(session(sess))
app.use(passport.initialize())
app.use(passport.session())
app.use(userInViews())

// sets view engine and the path to the views
app.engine('.hbs', exphbs({ extname: '.hbs', handlebars: allowInsecurePrototypeAccess(Handlebars), layoutsDir: `${__dirname}/src/client/views` }))
app.set('view engine', '.hbs');
app.set('views', (path.join(__dirname + '/src/client/views')))
app.use(express.static(path.join(__dirname + '/src/client/', 'public')))

// sets security related http headers
app.use(helmet({ contentSecurityPolicy: false, }))
// set so app can parse json
app.use(json())
// where the static files are

// set so can parse html body
app.use(bodyParser.urlencoded({ extended: false }))

// registers routes plus their middleware handler
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
