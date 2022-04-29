const e = require('express');
var express = require('express');
var router = express.Router();
var user = require("../models/user")

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  res.render('user');
});

router.get('/register', (req, res, next) => {
  res.render('register')
})

router.get('/login', (req,res,next) => {
  res.render('login')
})

router.post('/login', (req,res,next) => {
  var {email, password} = req.body;
  if(!email || !password) {
    res.redirect('/users/login')
  }
  user.findOne({email}, (err, user) => {
    if(err) return next(err);
    // no user
    if(!user){
      res.redirect('/users/login');
    }
    // compair pasword
    user.verifyPassword(password, (err,result) => {
      if(err) return next(err);
      if(!result){
        res.redirect('/users/login')
      }
      // parsist logged in user information
      req.session.userId = user.id;
      res.redirect('/users')
    })

  })
})

router.post('/register', (req,res,next) => {
  user.create(req.body, (err, user) => {
    if (err) return res.redirect("/users/register")
    console.log(user)
    res.redirect('/users/login')
  })
  
})

module.exports = router;