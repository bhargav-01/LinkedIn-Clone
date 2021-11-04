var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



/////////////////////////////////////////////----Profile----\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
router.post('/profile',authenticate.verifyUser,(req,res,next)=>{
  
  User.findByIdAndUpdate(req.user._id,req.body,function (err, docs){
    if (err){
        console.log(err)
    }
    else{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({docs});
    }
  })
});

router.get('/Profile',authenticate.verifyUser,(req,res,next)=>{
  User.findById(req.user._id)
  .then(data=>{
      res.statusCode=200,
      res.setHeader('Content-Type', 'application/json');
      res.json(data);
  })
  .catch(err=>next(err));
})

/////////////////////////////////////////////--Profile-Education--\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


router.post('/profile/education',authenticate.verifyUser,(req,res,next)=>{
  
  User.findById(req.user._id)
  .then((user)=>{
      user.Education.push(req.body);
      user.save().then((user) => {
        console.log(req.body)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({status:"Updated Succesfully"});
      })            
  })
});

router.put('/profile/education/:id',authenticate.verifyUser,(req,res,next)=>{
  
  User.update({'_id':req.user._id},{$set:{"Education.$[elem]":req.body}},{multi: true,arrayFilters: [ { "elem._id":req.params.id } ]},function (err, docs){
    console.log(req.body)
      if (err){
          console.log(err)
      }
      else{
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({docs});
      }
  })
});

/////////////////////////////////////////////--Profile-certification--\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


router.post('/profile/certification',authenticate.verifyUser,(req,res,next)=>{
  
  User.findById(req.user._id)
  .then((user)=>{
      user.Certification.push(req.body);
      user.save().then((user) => {
        console.log(req.body)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({status:"Updated Succesfully"});
      })            
  })
});

router.put('/profile/certification/:id',authenticate.verifyUser,(req,res,next)=>{
  
  User.update({'_id':req.user._id},{$set:{"Certification.$[elem]":req.body}},{multi: true,arrayFilters: [ { "elem._id":req.params.id } ]},function (err, docs){
    console.log(req.body)
      if (err){
          console.log(err)
      }
      else{
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({docs});
      }
  })
});



/////////////////////////////////////////////----SignUp-Login----\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
router.get('/signup/:email',(req,res,next)=>{
    // console.log(req);
    User.find({email:req.params.email})
    .then(data=>{
        console.log(data)
        console.log(data.length)
        if(data.length==0)
        {
            console.log("hello");
            res.statusCode=200,
            res.setHeader('Content-Type', 'application/json');
            res.json({unique: true, status: 'Email is Unique!'});
        }
        else
        {
            res.statusCode=200,
            res.setHeader('Content-Type', 'application/json');
            res.json({unique: false, status: 'Email not is Unique!'});
        }
    })
    .catch(err=>next(err));
})

router.post('/signup/ld',authenticate.verifyUser,(req,res,next)=>{
  
  User.findByIdAndUpdate(req.user._id,req.body,function (err, docs){
    if (err){
        console.log(err)
    }
    else{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({docs});
    }
  })
})

router.post('/signup/Jd',authenticate.verifyUser,(req,res,next)=>{
  
  User.findById(req.user._id)
  .then((user)=>{
      user.Jobs.push(req.body);
      user.save().then((user) => {
        console.log(req.body)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({status:"Updated Succesfully"});
      })            
  })
})

router.post('/signup/Ed',authenticate.verifyUser,(req,res,next)=>{
  
  User.findById(req.user._id)
  .then((user)=>{
      user.Education.push(req.body);
      user.save().then((user) => {
        console.log(req.body)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({status:"Updated Succesfully"});
      })            
  })
})


router.post('/signup', (req, res, next) => {
  User.register(new User({email: req.body.email}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else
    {
      if (req.body.firstName)
        user.firstname = req.body.firstName;
      if (req.body.lastName)
        user.lastname = req.body.lastName;

      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        console.log(user);
        
        passport.authenticate('local')(req, res, () => {
          var token = authenticate.getToken({_id: user._id});
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true,token:token,status: 'Registration Successful!'});
        })

      });
    }
  });
})



router.post('/login', passport.authenticate('local'), (req, res) => {

  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});
module.exports = router;
