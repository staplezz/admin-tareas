var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require("passport-local")
const Usuario = require('./models/usuario');

// Activación de dotenv.
require('dotenv').config();


// Rutas de la app.
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var tasksRouter = require('./routes/task');
var logoutRouter = require('./routes/logout');

var app = express();

// Configuración de render de vista: pug.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/** Flash messages */
app.use(require('connect-flash')());

// Middlewares.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración Passport.
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Usuario.authenticate()));
passport.serializeUser(Usuario.serializeUser());
passport.deserializeUser(Usuario.deserializeUser());

// Configuración de rutas.
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/tareas', tasksRouter);
app.use('/', indexRouter);
app.use('/logout', logoutRouter);

// Conexión con BDD.
mongoose.connect(process.env.MONGODB_ATLAS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) throw err;
  console.log("Base de datos online");
});


// Catch 404 y redireccionar al error handler.
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
