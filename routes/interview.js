const express = require('express');
const router = express.Router();
const interviewCreate = require('../controllers/interviewCreate');
const interviewEdit = require('../controllers/interviewEdit');
const Candidate = require('../models/candidate');
const Interview = require('../models/interview');

router.route('/create')
.get(async(req,res)=>{
    const candidates = await Candidate.find({});
    // console.log(candidates);
    res.render('createInterview',{candidates: candidates});
})
.post(interviewCreate.createInterview);

router.route('/view/:id')
.get(async(req,res)=>{
    let {id}=req.params;
    let interview = await Interview.findById(id).populate('candidates');
    // console.log(interview);
    return res.render('viewInterview',{interview: interview});
})

router.route('/edit/:id')
.get(async(req,res)=>{
    let {id}=req.params;
    let interview = await Interview.findById(id).populate('candidates');
    const candidates = await Candidate.find({});
    return res.render('editInterview',{interview: interview,candidates: candidates});
})

router.route('/edit')
.post(interviewEdit.editInterview);
// .post(interviewEdit.editInterview);

module.exports = router;