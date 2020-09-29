export const userInViews = () => {
	return async (req, res, next) => {
		res.locals.user = await req.user
		await next()
	}
}
