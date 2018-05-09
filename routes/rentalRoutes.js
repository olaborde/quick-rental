const express = require('express');
const router  = express.Router();
const User = require('../models/user');
const Listing = require('../models/listing');



const multer = require('multer');
const path = require('path');

const myUploader = multer({
  dest:path.join(__dirname, '../public/images')
});


/* GET dashboard with the create form */
router.get('/rentals/create', (req, res, next) => {
  res.render('rentals/createRental');
});

// post route to create listing
router.post('/rentals/create', myUploader.single('rentalPhoto'), (req, res, next) => {
  // const rentalName = req.body.rentalName;
  // const rentalAddress = req.body.rentalAddress;
  // const rentalDescription = req.body.rentalDescription;
  // const availability = req.body.availability;
  // const rentalPhoto = `/images/${req.file.filename}`;
  
  // console.log(req.body)

  const newRental = new Listing({
    name:req.body.rentalName,
    address: req.body.rentalAddress,
    description: req.body.rentalDescription,
    availability: req.body.availability,
    photo: `/images/${req.file.filename}`
  })
  newRental.save()
  .then( () => {

    // console.log("Saved in DB: ", newRental)
    res.redirect('/rentals/list')
  } )
  .catch( error => {
    console.log("Error while creating listing: ", error)
  } )
})


router.get('/rentals/list', (req, res, next) => {
  Listing.find()
  .then( listingsFromDb => {
    res.render('rentals/list', { listings: listingsFromDb })
  } )
  .catch( error => {
    console.log("Error while displaying listing: ", error)
  } )
})



module.exports = router;
