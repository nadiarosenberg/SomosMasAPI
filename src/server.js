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
const testimonialsRouter = require('./controllers/testimonials');
const authRouter = require('./routes/auth');
const membersRouter = require('./controllers/members');
const rolesRouter = require('./controllers/roles');
const newReportRouter = require('./controllers/newreports');
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
app.use('/news', newReportRouter)
app.use('/activities', activitiesRouter);
app.use('/organizations', organizationsController)
app.use('/slides', slidesRouter);


app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});

module.exports = app;