// import dependencys/ modules
import express, { json } from 'express'
import path from 'path'
import exphbs from 'express-handlebars'
import helmet from 'helmet'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import session from 'express-session'
import passport from 'passport'
import Auth0Strategy from 'passport-auth0'

dotenv.config()

// importing router
import indexRouter from './src/server/routes/index'
import caseRouter from './src/server/routes/cases/case_old'
import authRouter from './src/server/routes/auth'
import oefrechtRouter from './src/server/routes/cases/oefrecht'
import strafrechtRouter from './src/server/routes/cases/strafrecht'
import zivilrechtRouter from './src/server/routes/cases/zivilrecht'
import { userInViews } from './src/server/middlewares/userInViews'
import usersRouter from './src/server/routes/users'

// importing middleware
import { secured } from './src/server/middlewares/secured'

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

// auth0 related
app.use(session(sess))
app.use(passport.initialize())
app.use(passport.session())
app.use(userInViews())

// sets view engine and the path to the views
app.engine('.hbs', exphbs({ extname: '.hbs', layoutsDir: `${__dirname}/src/client/views` }));
app.set('view engine', '.hbs');
app.set('views', (path.join(__dirname + '/src/client/views')))

// sets security related http headers
app.use(helmet())
// set so app can parse json
app.use(json())
// where the static files are
app.use(express.static(path.join(__dirname + '/src/client', 'public')))
// set so can parse html body
app.use(bodyParser.urlencoded({ extended: false }))

// registers routes plus their middleware handler
app.use('/', indexRouter)
app.use('/', authRouter)
app.use('/users', secured, usersRouter)
app.use('/cases', secured, caseRouter)
app.use('/cases/oefrecht', secured, oefrechtRouter)
app.use('/cases/strafrecht', secured, strafrechtRouter)
app.use('/cases/zivilrecht', secured, zivilrechtRouter)


export default app
