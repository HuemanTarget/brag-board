const mongoose = require('mongoose')
const Schema = mongoose.Schema

let commentSchema = new Schema({
    content: String,
    rating: {
      type: String,
      enum: ['Awesome Job!', 'Keep It Up!', 'I Can Do Better!', 'SHAME!'],
    }
  }, {
    timestamps: true
  });

let bragSchema = new Schema({
    game: {
      type: String,
      enum: ['Call Of Duty', 'Destiny', 'Fortnite', 'Halo'],
    },
    sport: {
      type: String,
      enum: ['Running', 'Weight Lifting', 'Hockey', 'Baseball', 'Football', 'Basketball'],
    },
    food: {
      type: String,
      enum: ['Fastest Eating', 'Largest Food', 'Heaviest Food', 'Most...'],
    },
    body: {
      type: String,
      enum: ['Longest', 'Shortest', 'Tallest', 'Heaviest', 'Oldest', 'Youngest', 'Most....'],
    },
    title: String,
    content: String,
    proof: String,
    shame: Boolean,
    date: {
      type: Date, default: function(){
          let d = new Date()
          return d.toLocaleDateString();
      }
    },
    comments: [commentSchema],
    user: [{
      type: Schema.Types.ObjectId, 
      ref: 'User',
    }]
  }, {
    timestamps: true
  });


  module.exports = mongoose.model('Brag', bragSchema)