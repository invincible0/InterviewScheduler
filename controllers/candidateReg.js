const Candidate = require('../models/candidate');

module.exports.register = async(req,res,next)=>{
    try{
        const {fullname,email} = req.body;
        const user = await Candidate.findOne({email: email.trim()});
        if(user){
            return res.redirect('/');
        }
        const candidate = new Candidate({fullname,email});
        await candidate.save();
        req.flash('success',"registered successfully");
        res.redirect('/');
    }
    catch(e){
        console.log(e);
        req.flash("error","could not register");
        res.redirect('/');
    }
}