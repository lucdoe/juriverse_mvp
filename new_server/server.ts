import app from './app'
import { connectDB } from './middlewares/db'

connectDB()

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

const port = process.env.port || 3000

const server = app.listen(port, () => {
	console.log('	' + '> Juriverse App live on http://localhost:%d in %s mode.', port, app.get('env'))
	console.log('	> Press CTRL-C to stop the application.\n')
})

export default server
