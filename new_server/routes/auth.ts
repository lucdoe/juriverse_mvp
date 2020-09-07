import { Router } from 'express'
import passport from 'passport'
import dotenv from 'dotenv'
import util from 'util'
import url from 'url'
import querystring from 'querystring'
dotenv.config()

const router = Router()

// Perform the login, after login Auth0 will redirect to callback
router.get(
	'/login',
	passport.authenticate('auth0', {
		scope: 'openid email profile',
	}),
	(req, res) => {
		res.redirect('/')
	}
)

// Perform the final stage of authentication and redirect to previously requested URL or '/user'
router.get('/callback', (req: any, res, next) => {
	passport.authenticate('auth0', (err, user, info) => {
		if (err) {
			return next(err)
		}
		if (!user) {
			return res.redirect('/login')
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err)
			}
			const returnTo = req.session.returnTo
			delete req.session.returnTo
			res.redirect(returnTo || '/')
		})
	})(req, res, next)
})

// Perform session logout and redirect to homepage
router.get('/logout', (req: any, res: any) => {
	req.logout()

	let returnTo = req.protocol + '://' + req.hostname
	const port = req.connection.localPort
	if (port !== undefined && port !== 80 && port !== 443) {
		returnTo += ':' + port
	}
	const logoutURL = new url.URL(util.format('https://%s/v2/logout', process.env.AUTH0_DOMAIN))
	const searchString = querystring.stringify({
		client_id: process.env.AUTH0_CLIENT_ID,
		returnTo: returnTo,
	})
	logoutURL.search = searchString

	res.redirect(logoutURL)
})

export default router
