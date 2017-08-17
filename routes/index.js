var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Network = mongoose.model('Network');
var Station = mongoose.model('Station');
var Review = mongoose.model('Review');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
