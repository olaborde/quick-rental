const express = require('express');
const router  = express.Router();
// const Listing = require('../models/listing.js');
// const uploadCloud = require('../config/cloudinary.js');





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
  res.render('index');
});


// router.post('/create', (req, res, next)=>{
//   User.create({
    
//     username: req.body.username,
//     photo: req.body.photo,
//   })
    
// });

module.exports = router;
