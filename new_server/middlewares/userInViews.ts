export const userInViews = () => {
	return (req, res, next) => {
		res.locals.user = req.user
		next()
	}
}
