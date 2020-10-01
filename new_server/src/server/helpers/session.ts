export const sess = {
    secret: process.env.session_secret,
    cookie: { maxAge: 3 * 3600000, secure: false, httpOnly: false, },
    resave: false,
    saveUninitialized: true,
}

if (process.env.NODE_ENV === 'production') {
    // Use secure cookies in production (requires SSL/TLS)
    sess.cookie.secure = true
    sess.cookie.httpOnly = true

    // Uncomment the line below if your application is behind a proxy (like on Heroku)
    // or if you're encountering the error message:
    // "Unable to verify authorization request state"
    // app.set('trust proxy', 1);
}

