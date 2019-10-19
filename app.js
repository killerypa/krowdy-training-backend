var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var bodyParse = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const passport = require('passport');
// const BasicStrategy = require('passport-http').BasicStrategy;

// Imports locales
var config = require('./config/config');
const logger = require('./utils/logger');

// Basic Auth
// passport.use(new BasicStrategy((user, password, done) => {
//   if (user === 'luis' && password === 'krowdy123') {
//     return done(null, true);
//   } else {
//     return done(null, false);
//   }
// }))

// app.use(passport.initialize())

// Routes
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api/index');

var app = express();

// Implements Looger using Morgan
app.use(morgan('short', {
    stream: {
        write: message => logger.info(message.trim()),
    }
}));

// connect to db
// const MONGO_URI = `mongodb://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
//mongoose.Promise = global.Promise;
//console.log(MONGO_URI)
//mongoose.connect(MONGO_URI, {useNewUrlParser: true})
//    .then(() => {
//      console.log('Success')
//    }).catch(err => {
//      console.log(err);
//    }
//);

// Middlewares
app.use(bodyParse.json({limit: '50mb'}));
app.use(bodyParse.urlencoded({limit: '50mb', extended: true}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Cors
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
