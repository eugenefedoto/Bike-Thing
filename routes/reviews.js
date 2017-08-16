var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Network = mongoose.model('Network');
var Station = mongoose.model('Station');
var Review = mongoose.model('Review');

/* POST add a review for a given station _id */
router.post('/', function(req, res, next) {
  var review = new Review({
    station_id: mongoose.Types.ObjectId(req.body.station_id),
    network_id: mongoose.Types.ObjectId(req.body.network_id),
    author: req.body.author,
    star_rating: req.body.star_rating,
    content: req.body.content
  });
  review.save(function(err, review) {
    if(err) {
      res.status(500).send(err);
    }
    else {
      res.send(review);
    }
  });
});

/* GET all reviews given station_id. */
router.get('/:station_id', function(req, res, next) {
  Review.find({"station_id": mongoose.Types.ObjectId(req.params.station_id)}, function(err, reviews) {
    if(err) {
      console.log(err);
    }
    else {
      res.json(reviews);
    }
  });
});

module.exports = router;