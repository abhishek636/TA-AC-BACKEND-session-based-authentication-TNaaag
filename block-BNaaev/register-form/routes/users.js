var express = require('express');
var router = express.Router();
var user = require("../models/user")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', (req, res, next) => {
  res.render('register')
})

router.get('/login', (req,res,next) => {
  res.render('login')
})

router.post('/register', (req,res,next) => {
  user.create(req.body, (err, user) => {
    if (err) return res.redirect("/users/register")
    console.log(user)
    res.redirect('/users/login')
  })
  
})

module.exports = router;
