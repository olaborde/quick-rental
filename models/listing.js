
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const listingSchema = new Schema({
  name: String,
  photo: String,
  address : String,
  description: String,
  availability: Boolean,
  listingOwner: { type: Schema.Types.ObjectId, ref: "User" }
});

const Listing = mongoose.model('Listing', listingSchema);


module.exports = Listing;