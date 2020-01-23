const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema({
    name: String,
    email: String,
    brags: [{
      type: Schema.Types.ObjectId, 
      ref: 'Brag',
    }],
    comments: [{
      type: Schema.Types.ObjectId, 
      ref: 'Comments',
    }],
    likes: String,
    shame: Boolean,
    googleId: String,
    avatar: String,
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('User', userSchema)