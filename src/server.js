const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const key = require("./utils/key");
const exphbs = require('express-handlebars')

require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./controllers/users');
const organizationsController = require('./controllers/organizations');
const testimonialsRouter = require('./routes/testimonials');
const authRouter = require('./routes/auth');
const rolesRouter = require('./controllers/roles');
const membersRouter = require('./controllers/members');
const newsRouter = require('./routes/newreports');
const newReportRouter = require('./controllers/newreports').newReportRouter;
const categoriesRouter = require('./controllers/categories');
const activitiesRouter = require('./controllers/activities');
const slidesRouter = require('./controllers/slides');

const app = express();

app.use(cors())

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');


app.set(key.secretName, key.key);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testimonials', testimonialsRouter);
app.use('/auth', authRouter);
app.use('/members', membersRouter);
app.use('/roles', rolesRouter);
app.use('/categories', categoriesRouter);
app.use('/news', newsRouter);
app.use('/news', newReportRouter)
app.use('/activities', activitiesRouter);
app.use('/organizations', organizationsController)
app.use('/slides', slidesRouter);
app.use('/users', usersRouter);

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
});

module.exports = app;