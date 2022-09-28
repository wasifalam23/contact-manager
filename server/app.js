const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');

const contactRouter = require('./routes/contactRoutes');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'images')));

app.use(morgan('dev'));

app.use('/api/v1/contacts', contactRouter);
app.use(globalErrorHandler);

module.exports = app;
