const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    }
});

module.exports = mongoose.model('candidate',candidateSchema);