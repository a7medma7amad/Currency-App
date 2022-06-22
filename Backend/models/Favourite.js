const mongoose = require('mongoose');

const favouritesSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  conversion:{
    type: String,
    required: true,
  }
  
}, { timestamps: true });

const Favourite = mongoose.model('Favourites', favouritesSchema);
module.exports = Favourite ;