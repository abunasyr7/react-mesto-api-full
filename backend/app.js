const express = require('express');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const { errors, celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');
const usersRoute = require('./routes/users');
const cardRoute = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-error');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use('/', express.json());

const randomString = crypto
  .randomBytes(16)
  .toString('hex');
console.log(randomString);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

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

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.use(limiter);

app.listen(3000, () => {
  console.log('Server has been started');
});
