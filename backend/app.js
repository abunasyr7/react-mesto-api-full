const express = require('express');
// const crypto = require('crypto');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
// const rateLimit = require('express-rate-limit');
const { errors, celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const usersRoute = require('./routes/users');
const cardRoute = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// });

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));
app.use(helmet());
app.use('/', express.json());

// const allowedCors = [
//   'http://api.mesto.abunasyr7.nomoredomains.club',
//   'http://localhost:3000',
// ];

// app.use((req, res, next) => {
//   const { origin } = req.headers;
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   const { method } = req;
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   const requestHeaders = req.headers['access-control-request-headers'];
//   res.header('Access-Control-Allow-Credentials', true);

//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     return res.end();
//   }
//   next();
// });

// app.use(cookieParser());
app.use(cookieParser());
app.use(bodyParser.json());

// const randomString = crypto
//   .randomBytes(16)
//   .toString('hex');
// console.log(randomString);

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадет');
//   }, 0);
// });

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([/\w \\.-]*)*\/?$/),
  }),
}), createUser);

app.use(auth);
app.use('/', usersRoute);
app.use('/', cardRoute);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Not Found'));
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  // const { statusCode = 500, message } = err;
  // res.status(statusCode).send({
  //   message: statusCode === 500
  //     ? 'На сервере произошла ошибка'
  //     : message,
  // });
  // next();
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});

// app.use(limiter);

app.listen(8000, () => {
  console.log('Server has been started');
});
