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
  const newRental = new Listing({
    name:req.body.rentalName,
    address: req.body.rentalAddress,
    description: req.body.rentalDescription,
    availability: req.body.availability,
    photo: `/images/${req.file.filename}`
  });
  newRental.save()
  .then( () => {

    // console.log("Saved in DB: ", newRental)
    res.redirect('/rentals/list')
  } )
  .catch( error => {
    console.log("Error while creating listing: ", error);
  } )
})


router.get('/rentals/list', (req, res, next) => {
  Listing.find()
  .then( listingsFromDb => {
    res.render('rentals/list', { listings: listingsFromDb });
  } )
  .catch( error => {
    console.log("Error while displaying listing: ", error);
  } );
});

//details view
router.get('/rentals/:theId', (req, res, next) => {
  const listingId = req.params.theId;
  // console.log(clistingId)
  Listing.findById(listingId)
  .then(oneListingFromDB => {
      // console.log(onelistingFromDB)
      res.render('rentals/details-view', { listings: oneListingFromDB });
  })
  .catch( error => {
      console.log("Error while getting details: ", error);
  });
});
// end of details view

//edit route


router.get('/rentals/edit-view/:id', (req, res, next) => {
  const listingId = req.params.id;
  // console.log(listingId);
  Listing.findById(listingId)
  .then(listingFromDB => {
      res.render("rentals/edit-view", {listing: listingFromDB});
  });
});


router.post('/rentals/update/:id', myUploader.single('editedPhoto'), (req, res, next) => {
  const listingId = req.params.id;

  // const editedListing ={};
  // editedListing.name = req.body.editedName;
  // editedListing.address = req.body.editedAddress;
  // editedListing.description = req.body.editedDescription;
  // editedListing.availability = req.body.editedAvailability;
  // if(req.body.editedPhoto === true){
  //   editedListing.photo = `/images/${req.file.filename}`;
  // }
  Listing.findById(listingId)
  .then((listingFromDB) => {
    console.log("heyyyyy", req.body)
    listingFromDB.name = req.body.editedName;
    listingFromDB.address = req.body.editedAddress;
    listingFromDB.description = req.body.editedDescription;
    listingFromDB.availability = req.body.editedAvailability;
    if(req.body.editedPhoto){
      listingFromDB.photo = `/images/${req.file.filename}`;
    } else {
      listingFromDB.photo = listingFromDB.photo;
    }
    listingFromDB.save((err) =>{
      if(err){
        console.log("err is: ", err);
        return;
      }
      res.redirect(`/rentals/${listingId}`);
    });
  })
  .catch( error => {
      console.log("Error while updating: ", error);
  });
});


// end edit route


//beginning of delete route
router.post('/rentals/:theId', (req, res, next) => {
  const listingId = req.params.theId;
  Listing.findByIdAndRemove(listingId)
  .then(() => {
      res.redirect("/rentals/list");
  })
  .catch( error => {
      console.log("Error while deleting: ", error);
  });
});


//end of delete route

module.exports = router;
 