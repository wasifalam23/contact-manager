const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');

const contactRouter = require('./routes/contactRoutes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/contacts', contactRouter);
app.use(globalErrorHandler);

module.exports = app;
