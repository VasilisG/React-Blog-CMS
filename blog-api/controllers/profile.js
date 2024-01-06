const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Profile = require('../models/Profile');

exports.createProfile = asyncHandler(async (req, res, next) => {

    const profile = await Profile.create({
      fullname: 'User',
      description: '',
      image: ''
    });

    res.status(200).json({
      success: true,
      data: profile
    });
});

exports.getProfile = asyncHandler(async (req, res, next) => {

  const profiles = await Profile.find({}).limit(1);

  const profile = profiles[0];

  res.status(200).json({
    success: true,
    data: profile
  });

});

exports.updateProfile = asyncHandler(async (req, res, next) => {

  const files = { ...req.files };

  const postBody = { ...req.body };

  let newImage;

  if(files.image) {

    newImage = files.image[0].path;
  }
  else {

    let { image } = req.body;

    if(!image) {

      newImage = '';
    }

    else newImage = image;
  }

  const data = { 
    ...postBody,
    image: newImage
  };

  
  const profiles = await Profile.find({}).limit(1);

  let profile = profiles[0];

  profile = await Profile.findOneAndUpdate({_id: profile._id}, data, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: profile
  });

});

exports.deleteProfile = asyncHandler(async (req, res, next) => {

  const profile = Profile.findById(req.params.id);

  if(!profile){
    next(new ErrorResponse(`Profile not found with id of ${req.params.id}`, 404))
  }

  profile.remove();

  res.status(200).json({
    success: true,
    data: []
  });

});