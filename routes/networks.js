var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Network = mongoose.model('Network');
var Station = mongoose.model('Station');
var Review = mongoose.model('Review');

/* GET all networks. */
router.get('/', function(req, res, next) {
  Network.find({}, function(err, networks) {
    if(err) {
      console.log(err);
    }
    else {
      res.json(networks);
    }
  });
});

/* GET one network given _id. */
router.get('/:_id', function(req, res, next) {
  Network.findById(mongoose.Types.ObjectId(req.params._id), function(err, network) {
    if(err) {
      console.log(err);
    }
    else {
      res.json(network);
    }
  });
});

module.exports = router;