const Interview = require('../models/interview');

module.exports.editInterview = async(req,res,next)=>{
    var start= req.body.date+"T"+req.body.startTime+"+05:30";
    start = new Date(start);
    var end = req.body.date+"T"+req.body.endTime+"+05:30";
    end = new Date(end);
    var valid=true;
    var errorMessage;
    if(end.getTime() <start.getTime()){
        valid=false;
        errorMessage="start time should be less then or equal to end time";
    }
    else if(typeof(req.body.person)!='object'){
        valid=false;
        errorMessage="number of candidates should be >=2";
    }
    else{
        try{
            let item = await Interview.findOne({
                $and: [{ candidates: { $in: req.body.person } },  { _id: { $ne: req.body._id }}, {
                  $or: [{
                    $and: [{ start: { $lte: start } }, { $and: [{ end: { $gte: start } }, { end: { $lte: end } }] }]
                  },
                  {
                    $and: [{ $and: [{ start: { $gte: start } }, { start: { $lte: end } }] }, { end: { $gte: end } }]
                  },
                  {
                    $and: [{ start: { $gte: start } }, { endTime: { $lte: end } }]
                  }]
                }]
            });
            if(item){
                valid=false;
                errorMessage="Some candidates have interviews in the selected time range";
            }
        }
        catch(e){
            valid=false;
            errorMessage="Some error occurred";
        }
    }
    if(valid){
        try{
        await Interview.findByIdAndUpdate(req.body._id, {
            name: req.body.name,
            startTime: start,
            endTime: end,
            candidates: req.body.person
          });
        }
        catch(e){
            valid=false;
            errorMessage="Some error Occurred";
        }
    }
    // if(!valid){
    //     alert(errorMessage);
    //     return res.redirect('/createInterview');
    // }
    // else{
    //     alert("successfully created");
    //     return res.redirect('/');
    // }
    if(!valid){
        req.flash('error',errorMessage);
    }
    else{
        req.flash('success',"edit done successfully");
    }
    return res.redirect('/');
}

// module.exports.createInterview = async(req,res,next)=>{
//     console.log("inside create Interview");
//     res.redirect('/');
// }