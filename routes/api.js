var express = require('express');
var router = express.Router();
var database = require('../database');
var Contact = database.contact();

router.get('/api/', function(req, res) {


  Contact.find(function (err, contacts) {
    if (err) return console.error(err);
    res.send(contacts);
  });
});

router.post('/api/', function(req, res) {

  var body = {
    Name: req.body.Name,
    LastName: req.body.LastName,
    Age: req.body.Age,
    Phone: req.body.Phone
  };
  var contact = new Contact(body);

  Contact.create(contact, function(err, item) {

    if (err) return console.error(err);
    res.send(contact);
  });

});

router.put('/api/:id', function(req, res) {
  var id = req.params.id;
  var opts = { strict: false };
  var update = {
    Name: req.body.Name,
    LastName: req.body.LastName,
    Age: req.body.Age,
    Phone: req.body.Phone
  };
  console.log(update);
 Contact.update({id: id}, update, opts, function(err, raw) {
    if (err) return console.error(err);
    res.send({modified: raw.nModified});
  });
});

router.delete('/api/:id', function(req, res) {
  var id = req.params.id;
  Contact.remove({ id: id }, function(err) {
    if (err) return console.error(err);
    res.send({removed: "success"});
  });
});

module.exports = router;