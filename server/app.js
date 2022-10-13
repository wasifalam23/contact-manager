const multer = require('multer');
const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');

const contactRouter = require('./routes/contactRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());
// app.use(multer().array());
app.use(express.static(path.join(__dirname, 'images')));

app.use(morgan('dev'));

app.use('/api/v1/contacts', contactRouter);
app.use('/api/v1/users', userRouter);

app.use(globalErrorHandler);

module.exports = app;
