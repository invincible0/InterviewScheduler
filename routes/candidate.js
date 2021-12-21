const express = require('express');
const router = express.Router();
const candidate = require('../controllers/candidateReg');

router.route('/')
.get((req,res)=>{
    res.render('candidateReg');
})
.post(candidate.register);

module.exports = router;