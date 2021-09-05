var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
var { Sequelize } = require('sequelize');
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');


var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var contatoRouter = require('./routes/contato');

var app = express();
var cors = require('cors');
app.listen(process.env.PORT);
app.use(cors());
var sequelize = new Sequelize('email-check', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

var swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API REST Express de um gerenciador simples de contatos.',
    version: '1.0.0',
    description: ('Esta é uma aplicação de API REST feita com Express.' +
                  'Ela utiliza dados de uma agenda de contatos.'),
    license: {
      name: 'Licenciado sob GPL.',
      url: 'https://github.com/ifpb-cz-ads/pw2-2021-1-mp01-team-thiago',
    },
    contact: {
      name: 'Thiago Yure',
      url: 'https://github.com/ThiagoYure',
    },
  },
  servers: [
    {
      url: 'http://localhost:3333',
      description: 'Development server',
    },
  ],
};
var options = {
  swaggerDefinition,
  apis: ['./routes/user.js', './routes/contato.js'],
};
var swaggerSpec = swaggerJSDoc(options);

// middleware init
dotenv.config();
sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/contato', contatoRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// catch 404 and forward to error handler
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
