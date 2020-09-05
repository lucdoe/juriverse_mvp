import { NextFunction } from 'express'

export const userInViews = () => {
	return (req: any, res: any, next: NextFunction) => {
		res.locals.user = req.user
		next()
	}
}
