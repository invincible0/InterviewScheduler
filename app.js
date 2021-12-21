const express = require('express');
const app = express();
const dbUrl = "mongodb://localhost:27017/scalar1";
const Secret = "DummySecret";
const mongoose = require('mongoose');
const path = require('path');
const Interview = require("./models/interview");
const Candidate = require("./models/candidate");

const session = require('express-session');
const flash = require('connect-flash');

mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"Connection Error: "));
db.once("open",()=>{
    console.log("database Connected");
});

app.use(session({
    secret: Secret,
    saveUninitialized: true,
    resave: true
}));
  
app.use(flash());

app.use(function (req, res, next) {
res.locals.flash = {
    'success': req.flash('success'),
    'error': req.flash('error')
}
next();
});

app.set('views', __dirname + '/views');
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const indexRoute = require('./routes/index');
const candidateRoute = require('./routes/candidate');
const interviewRoute = require('./routes/interview');

// app.use((req,res,next)=>{
//     res.locals.currentUser = req.user;
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     next();
// });

app.use('/',indexRoute);
app.use('/candidateReg',candidateRoute);
app.use('/interview',interviewRoute);

app.listen(3001,()=>{
    console.log('serving on port 3000');
});