let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const cors = require('cors')

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let postsRouter = require('./routes/posts');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/posts');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function (callback) {
    console.log('Connection Succeeded');
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
app.listen(process.env.PORT || 8081)