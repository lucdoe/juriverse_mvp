import * as dotenv from 'dotenv'
dotenv.config()
import * as bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'
import User from '../models/model.User'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

let refreshTokens: string[] = []
const refreshSecret: any = process.env.REFRESH_TOKEN_SECRET
const accessTokenSecret: any = process.env.TOKEN_KEY

export const registerUser = async (request: Request, response: Response, next: NextFunction) => {
	const { name, email, university, password, passwordRepeat } = request.body

	const userCheck = async () => {
		const checkedUser = await User.findOne({ email })
		if (checkedUser) response.status(401).json({ error: 'This email already exists!' })
	}

	const passwordCheck = () => {
		if (password.length <= 7) response.json({ error: 'Password to short.' })
		if (password != passwordRepeat) response.json({ error: 'Passwords do not match.' })
	}

	const createUser = async () => {
		userCheck()
		passwordCheck()

		const id = uuidv4()

		await User.create({
			id,
			name,
			email,
			university,
			password: await bcrypt.hash(password, 10),
		})

		const userObject: object = {
			id,
			name,
			email,
			university,
			owns: [],
			drafts: [],
		}

		response.set('auth', generateTokens(userObject)).redirect('/')
	}

	createUser()
}

export const loginUser = async (request: Request, response: Response, next: NextFunction) => {
	const password: string = request.body.password
	const email: string = request.body.email

	await User.findOne({ email }, async (error, user) => {
		if (error) response.status(403).json({ error: 'Wrong username or password', status: 'Unauthorized' })

		if (!user) {
			response.status(403).json({ error: 'Wrong username or password', status: 'Unauthorized' })
		} else {
			await bcrypt.compare(password, user['password'], (error, result) => {
				if (error || !result)
					response.status(403).json({
						error: 'Wrong username or password',
						status: 'Unauthorized',
					})

				if (result) {
					let id = result['id']
					let university = result['uni']
					let drafts = result['drafts']
					let owns = result['owns']
					const userObject = {
						id,
						name,
						email,
						university,
						drafts,
						owns,
					}

					response.status(200).json(generateTokens(userObject))
				}
			})
		}
	})
}

export const refreshLoginToken = (request: Request, response: Response, next: NextFunction) => {
	const refreshToken: string = request.body.refreshToken

	if (refreshToken == null)
		return response.status(401).json({ error: 'Log in required', status: 'Unauthorized' })
	if (!refreshTokens) return response.status(403).json({ error: 'Log in required', status: 'Unauthorized' })

	jwt.verify(refreshToken, refreshSecret, (error, user) => {
		if (error)
			return response.status(403).json({
				error: 'Unvalid access',
				message: 'Try diffrent username or password',
				status: 'Unauthorized',
			})
		const token: string = accessToken(user)
		response.json({ token })
	})
}

export const logoutUser = (request: Request, response: Response, next: NextFunction) => {
	refreshTokens = refreshTokens.filter((token) => token !== request.body.token)
	response.status(403).json({ message: 'Loged out', status: 'Unauthorized' })
}

const accessToken = (user: string | object | Buffer): string => {
	return jwt.sign(user, accessTokenSecret)
}

const refreshToken = (user: string | object | Buffer): string => {
	const refershToken = jwt.sign(user, refreshSecret)
	refreshTokens.push(refreshToken(user))
	return refershToken
}

const generateTokens = (userData: object): string => {
	const token = accessToken(userData)
	return token
}
