'use strict'

const createError = require('http-errors');

const config = require('./config');
const express = require('express');

const session = require('express-session');
const redisStore = require('connect-redis')(session);
const { createClient } = require("redis");


const passport = require('./app/passport/setup');

const path = require('path');
const cookieParser = require('cookie-parser');
const log = require('./lib/logger');
const uuid = require('uuid');

//Routers
const authRouter = require('./app/routes/auth');
const adminRouter = require('./app/routes/admin');
const indexRouter = require('./app/routes/index');
const employeeRouter = require('./app/routes/employee');

const app = express()

// view engine setup
app.set('view engine', 'ejs');

switch (config.stage) {
    case 'development':
        app.locals.domain = 'gpscheckin.LOCAL'
        app.locals.defaultHtmlTitle = 'gpscheckin.LOCAL'
        app.locals.defaultPageTitle = 'gpscheckin.LOCAL'
    default:
        app.locals.domain = 'gpscheckin.LOCAL'
        app.locals.defaultHtmlTitle = 'gpscheckin.LOCAL'
        app.locals.defaultPageTitle = 'gpscheckin.LOCAL'
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//session / redis
app.set('trust proxy', 1);

//Configure redis client
const redisClient = createClient({
    url: `redis://${config.redis.host}:${config.redis.port}`,
    legacyMode : true
})
redisClient.connect().catch(console.error);

app.use(session({
    store: new redisStore({client: redisClient}),
    secret: config.session.cookie.secret,
    resave: true,
    saveUninitialized: false,
    name: config.session.cookie.name,
    cookie: {
        secure: config.session.cookie.secure,
        httpOnly: config.session.cookie.httpOnly,
        maxAge: config.session.cookie.maxAge
    }
}))

// passport
app.use(passport.initialize());
app.use(passport.session());

//logging
app.use((req, res, next) => {
    req.log = log.child({req_id: uuid.v4()}, true);
    req.log.info(req.method + ' ' + req.url);
    req.on("finish", () => req.log.info(res.statusCode));

    if (req.user || req.url.startsWith('/login') || req.url.startsWith('/auth') || req.url.startsWith('/employee')) {
        next();
    } else {
    res.redirect('/login');
    }
});

//locals - user
app.use((req, res, next) =>{
    res.locals.user = req.user;
    next();
})

//routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/employee', employeeRouter);

//catch 404 and forward error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.errorMessage = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    if (err.status == 404) {
        res.render('errors/404');
    } else {
        res.render('errors/error');
    }
});

module.exports = app;
