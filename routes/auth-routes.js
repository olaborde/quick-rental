const express = require('express');
const router  = express.Router();
const User    = require('../models/user');
const bcrypt  = require('bcrypt');
const saltRounds = 10;
const passport   = require('passport');
const flash       = require("connect-flash");


function isAdmin() {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === "Admin") {
      return next();
    } else {
      res.redirect('/');
    }
  };
}


// router.get('/no', (req, res, next)=>{

//   res.send('it didnt work');
// });

// router.get('/signup', (req, res, next)=>{
//   res.render('auth/signup');
// });//end get /signup


 router.post('/signup', (req, res, next)=>{
   const firstName = req.body.firstName;
   const lastName = req.body.lastName;
   const phone = req.body.phone;
   const password = req.body.password;
   const email = req.body.email;
   const role = req.body.role;

   if(email ===""||password==="" || firstName === "" || lastName === "" || phone === ""){
     res.redirect('/');
     return;
   }
   User.findOne({email:email})
   .then((user)=>{
     if(user !== null){
     res.render('auth/signup', {message:`
       Sorry, that username already exists.
       Please login if you already have an account.`
     });
       return;
     }// end the if statement
   const salt = bcrypt.genSaltSync(saltRounds);
   const hashPass = bcrypt.hashSync(password, salt);
   User.create({firstName:firstName,
      lastName:lastName,
      phone:phone,
      email:email,
      password: hashPass,
      role:role})
   .then((theUser)=>{
     res.redirect('/');
   })
   .catch((err)=>{
     console.log(err);
     next(err);
   });

 })//end the .then promise for user.findOne query
   .catch((err)=>{
     console.log(err);
     next(err);
   });
 });//end post /signup route



// // end of signup

//  router.get('/login', (req, res, next)=>{
//    res.render('auth/login', { "message": req.flash("error")});
//  });//end get /login


 router.post("/login", passport.authenticate("local",
 {
   successRedirect: "/rentals/create",
   failureRedirect: "/",
   failureFlash: true,
   passReqToCallback: true
 }
));//end post /login


//logout

router.get("/logout", (req, res) => {
  console.log("Successfully logged out", req.user.email)
  req.logout();
  res.redirect("/");
});



module.exports = router;
