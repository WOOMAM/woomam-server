/** * @author Jaeyong Park <scorpion@dgu.ac.kr> */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var storesRouter = require('./routes/stores');
var wmsRouter = require('./routes/wms');
var signinRouter = require('./routes/signin');
var signupRouter = require('./routes/signup');

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/stores', storesRouter);
app.use('/wms', wmsRouter);
app.use('/signin',signinRouter);
app.use('/signup',signupRouter);


module.exports = app;
