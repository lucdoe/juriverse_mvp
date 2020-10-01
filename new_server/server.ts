import app from './app'
import chalk from 'chalk'


import { connectDB } from './src/server/middlewares/db'


if (process.env.NODE_ENV === 'production') {
	process.on('uncaughtException', (er) => {
		console.error(er.stack)
		if (er) console.error(er)
		process.exit(1)
	})
}


// error handler
app.use(async (err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = await err.message
	res.locals.error = await req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(await err.status || 500)
	res.render('error')
})


app.use((req, res, next) => {
	const message = "Seite wurde nicht gefunden, wir bitte dies zu entschuldigen."
	const error = "404 Not Found"
	res.status(404).render('error', { message, error })
})


const port = process.env.PORT

const server = app.listen(port, async () => {

	new chalk.Instance({ level: 3 });

	connectDB()

	console.log(chalk.bold('	' + '>>>', chalk.hex('#cca768')('Juriverse App'), 'live on', chalk.underline.blue('http://localhost:' + port), 'in', app.get('env'), 'mode. <<<'))
	console.log(chalk.bold('	>>> Press', chalk.red('CTRL-C to stop'), 'the application. <<<\n'))
})


export default server
