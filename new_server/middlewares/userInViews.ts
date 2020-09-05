export const userInViews = () => {
	return function (req, res, next) {
		res.locals.user = req.user
		next()
	}
}
