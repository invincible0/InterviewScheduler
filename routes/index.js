const express = require('express');
const router = express.Router();
const Interview = require('../models/interview');

router.route('/')
.get(async(req,res)=>{
    const interviews = await Interview.find({});
    res.render('index',{interviews: interviews});
})

module.exports =router;