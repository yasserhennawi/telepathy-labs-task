var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = new Schema({
  profile: {
    type: Object,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  twitterProvider: {
    type: {
      id: String,
      token: String
    },
    select: true
  }
});