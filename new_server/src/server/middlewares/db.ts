import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import chalk from 'chalk'

export const connectDB = () => {
	mongoose
		.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
		.catch((err) => console.log(err.reason))
	console.log('\n', chalk.bold('      ', '>>>', chalk.greenBright('MongoDB'), 'successfully connected. <<<'))
}
