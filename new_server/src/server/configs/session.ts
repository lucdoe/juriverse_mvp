export const sess = {
    secret: process.env.session_secret,
    cookie: { maxAge: 3 * 3600000, secure: false, httpOnly: false, },
    resave: false,
    saveUninitialized: true,
}


