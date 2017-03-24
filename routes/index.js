var express = require('express');
var router = express.Router();
//var database = require('../database');

router.get('/', function (req, res) {
    res.sendfile(__dirname + '/../index.html');
});

router.get('/index', function (req, res) {
    res.sendfile(__dirname + '/../index.html');
});

router.get('/public/css/app.css', function (req, res) {
    res.sendfile(__dirname + '../public/css/book_style.css');
});

router.get('/public/app.js', function (req, res) {
    res.sendfile(__dirname + '../public/app.js');
});


module.exports = router;