var express = require('express');
var router = express.Router();

//mailing setting
var nodemailer = require('nodemailer');
var config = require('../config');
var transport = nodemailer.createTransport(config.mailer);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CodeShare - A platform for sharing code' });
});

router.get('/about',function(req,res,next) {
  res.render('about',{title:'CodeShare - A platform for sharing code'});
})

router.route('/contact')
  .get(function(req,res,next){
    res.render('contact',{title: 'CodeShare - A platform for sharing code'})
  })
  .post(function(req,res,next){
    req.checkBody('name','Empty name').notEmpty();
    req.checkBody('email','Empty email').notEmpty();
    req.checkBody('message','Empty message').notEmpty();
    var errors = req.validationErrors();

    if(errors){
      res.render('contact',{
        title:'CodeShare - A platform for sharing code',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors
    });
    } else{
      var mailOptions = {
        from: 'hamzaboy1993@gmail.com',
        to: 'has.hamza247@gmail.com',
        subject: 'You got a new message from visitor',
        text: req.body.message
      };

      transport.sendMail(mailOptions, function(error,info){
        if(error){
          return console.log(error);
        }
        res.render('thank',{title:'Code4Share- A platform for sharing code'})
      })


      res.render('thank',{title: 'CodeShare - A platform for sharing code'})
    }
    
  });

  
module.exports = router;
