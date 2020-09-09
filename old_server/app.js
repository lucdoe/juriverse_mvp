const createError = require('http-errors')
const express = require('express')
// HTTP request logger middleware for node.js
const morgan = require('morgan')
const path = require('path')
// template engine
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// routing for the views
const indexRouter = require('./routes/')
const followingRouter = require('./routes/following')
const savedRouter = require('./routes/saved')
const historyRouter = require('./routes/history')
const crudRouter = require('./routes/crud')
const caseRouter = require('./routes/case')
const uploadRouter = require('./routes/upload')

// defining instance of express
const app = express()

// view engine setup
// setting directory for views
app.set('view engine', 'html')
app.engine('html', require('handlebars').__express)
app.set('views', path.join(__dirname, 'views'))

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
// importing static files
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/following', followingRouter)
app.use('/saved', savedRouter)
app.use('/history', historyRouter)
app.use('/crud', crudRouter)
app.use('/case', caseRouter)
app.use('/upload', uploadRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
