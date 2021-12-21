const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interviewSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
      },
      endTime: {
        type: Date,
        required: true
      },
      candidates: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'candidate'
      }]
});

module.exports = mongoose.model('interview',interviewSchema);