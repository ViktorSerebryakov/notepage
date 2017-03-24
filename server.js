'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const database = require('./database');
const index = require('./routes/index');
const api = require('./routes/api');


app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', index);
app.get('/index', index);
app.get('/public/css/app.css', index);
app.get('/public/app.js', index);

app.get('/api/', api);
app.post('/api/', api);
app.put('/api/:id', api);
app.delete('/api/:id', api);



app.listen(9003, function () {
  console.log('listening on port 9003!');
});
