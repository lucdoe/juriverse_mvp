import express, { json } from 'express'
import path from 'path'
import hbs from 'hbs'
import helmet from 'helmet'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import session from 'express-session'
import passport from 'passport'
import Auth0Strategy from 'passport-auth0'
dotenv.config()

import indexRouter from './routes/index'
import caseRouter from './routes/case'
import authRouter from './routes/auth'
import { userInViews } from './middlewares/userInViews'
import usersRouter from './routes/users'
import { secured } from './middlewares/secured'

const app = express()

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
	{
		domain: process.env.AUTH0_DOMAIN,
		clientID: process.env.AUTH0_CLIENT_ID,
		clientSecret: process.env.AUTH0_CLIENT_SECRET,
		callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback',
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

if (app.get('env') === 'production') {
	// Use secure cookies in production (requires SSL/TLS)
	sess.cookie = true

	// Uncomment the line below if your application is behind a proxy (like on Heroku)
	// or if you're encountering the error message:
	// "Unable to verify authorization request state"
	// app.set('trust proxy', 1);
}

// You can use this section to keep a smaller payload
passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((user, done) => {
	done(null, user)
})

app.use(session(sess))
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'html')
app.engine('html', hbs.__express)
app.set('views', path.join(__dirname, 'views'))

app.use(helmet())
app.use(json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(userInViews())

app.use('/', authRouter)
app.use('/users', secured, usersRouter)
app.use('/', secured, indexRouter)
app.use('/faelle', secured, caseRouter)

export default app
