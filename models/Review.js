var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  station_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  network_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  author: {
    type: String,
    required: true,
    maxlength: [50, "Author must be less than 50 characters."]
  },
  star_rating: {
    type: Number,
    required: true,
    min: [0, "Negative star rating not allowed."],
    max: [5, "Greater than 5 star rating not allowed."],
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value"
    }
  },
  content: {
    type: String,
    required: true,
    minLength: [140, "Content must be at least 140 characters."]
  }
});

module.exports = mongoose.model("Review", reviewSchema);
