const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dwtho2kip',
  api_key: '629975817477331',
  api_secret: 'a6PFr92otxe7aXA8Vwc2M2ndon4'
});



module.exports = cloudinary;