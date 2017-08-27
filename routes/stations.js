var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var Network = mongoose.model("Network");
var Station = mongoose.model("Station");
var Review = mongoose.model("Review");

/* GET one station given _id. */
router.get("/:_id", function(req, res, next) {
  Station.findById(mongoose.Types.ObjectId(req.params._id), function(
    err,
    station
  ) {
    if (err) {
      console.log(err);
    } else {
      res.json(station);
    }
  });
});

/* PUT 
  update one or more of the following attributes in station given _id:
  => empty_slots
  => isClosed
  => isSafe
*/
router.put("/:_id", function(req, res, next) {
  Station.findById(mongoose.Types.ObjectId(req.params._id), function(
    err,
    station
  ) {
    if (
      err ||
      req.body.empty_slots < 0 ||
      (typeof req.body.isClosed !== "boolean" &&
        req.body.isClosed !== undefined) ||
      (typeof req.body.isSafe !== "boolean" && req.body.isSafe !== undefined)
    ) {
      res.status(500).send(err);
    } else {
      if (req.body.empty_slots === undefined) {
        station.empty_slots = station.empty_slots;
      } else {
        station.empty_slots = req.body.empty_slots;
      }
      if (req.body.isClosed === undefined) {
        station.isClosed = station.isClosed;
      } else {
        station.isClosed = req.body.isClosed;
      }
      if (req.body.isSafe === undefined) {
        station.isSafe = station.isSafe;
      } else {
        station.isSafe = req.body.isSafe;
      }

      station.save((err, station) => {
        if (err) {
          res.status(500).send(err);
        }
        res.send(station);
      });
    }
  });
});

module.exports = router;
