export const secured = async (req, res, next) => {
	if (req.user) {
		return await next()
	}
	req.session.returnTo = await req.originalUrl
	res.redirect('/login')
}
