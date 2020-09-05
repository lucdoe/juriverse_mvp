import app from './app'
import { connectDB } from './middlewares/middleware.db'

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

const server = app.listen('3000', () => {
	console.log('  > Juriverse App running on http://localhost:%d in %s mode.', '3000', app.get('env'))
	console.log('  > Press CTRL-C to stop the application.\n')
})

export default server
