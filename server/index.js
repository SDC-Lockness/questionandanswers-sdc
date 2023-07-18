require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
var router = require('./routes.js');
var cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/qa', router);


app.listen(PORT);
