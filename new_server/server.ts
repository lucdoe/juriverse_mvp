import app from './app'
import { connectDB } from './src/server/middlewares/db'
import chalk from 'chalk'
const ctx = new chalk.Instance({ level: 3 });

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

app.use((req, res, next) => {
	const message = "Seite wurde nicht gefunden, wir bitte dies zu entschuldigen."
	const error = "404 Not Found"
	res.status(404).render('error', { message, error })
})

const port = process.env.port || 2907

const server = app.listen(port, () => {
	connectDB()
	console.log(chalk.bold('	' + '>>>', chalk.hex('#cca768')('Juriverse App'), 'live on', chalk.underline.blue('http://localhost:' + port), 'in', app.get('env'), 'mode. <<<'))
	console.log(chalk.bold('	>>> Press', chalk.red('CTRL-C to stop'), 'the application. <<<\n'))
})

export default server
