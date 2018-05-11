const express = require('express');
const router  = express.Router();
const Listing = require('../models/listing');
const nodemailer = require('nodemailer'); 

// const Listing = require('../models/listing.js');
// const uploadCloud = require('../config/cloudinary.js');


// POST route from contact form
router.post('/', function (req, res) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
       service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: process.env.GMAIL_USER,
    subject: 'New message from contact form at Quick Rental',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`,
    html: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    
  };
  smtpTrans.sendMail(mailOpts)
  .then((success)=>{
    
    console.log(success);
    res.redirect('/');
  })
  .catch((err)=>{
    console.log(err);
  });
  

});


// router.post('/upload', uploadCloud.single('photo'), (req, res, next) => {
//   Listing.create({
//     name:,

//   })
//   newListing.save()
//   .then(movie => {
//     res.redirect('/');
//   })
//   .catch(error => {
//     console.log(error);
//   });
// });





/* GET home page */
router.get('/', (req, res, next) => {
  Listing.find()
  .then( listingsFromDb => {
    console.log(listingsFromDb);
    res.render('index', { listings: listingsFromDb });
  } )
  .catch( error => {
    console.log("Error while displaying listing: ", error);
  } );
  // res.render('index');
});


// router.get('/rentals/listall', (req, res, next) => {
//   Listing.find()
//   .then( listingsFromDb => {
//     res.sendfile('index', { listings: listingsFromDb });
//   } )
//   .catch( error => {
//     console.log("Error while displaying listing: ", error);
//   } );
// });


// router.post('/create', (req, res, next)=>{
//   User.create({
    
//     username: req.body.username,
//     photo: req.body.photo,
//   })
    
// });

module.exports = router;
