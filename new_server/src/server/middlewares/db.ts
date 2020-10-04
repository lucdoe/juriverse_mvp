import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import chalk from 'chalk'

export const connectDB = async () => {
	await mongoose
		.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
		.catch((err) => console.log(err.reason, 'Im throwing here'))
	console.log(chalk.bold('	' + '>>>', chalk.greenBright('MongoDB'), 'successfully connected. <<<', '\n'))
}
