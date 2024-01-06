const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { postImageUpload } = require('../config/storage');
const Post = require('../models/Post');
const { getUpdatedAsset } = require('../utils/imageFiles');

exports.getPosts = asyncHandler(async (req, res, next) => {

  res.status(200).json(res.filteredResults);

});

exports.getPost = asyncHandler(async (req, res, next) => {

  const post = await Post.findById(req.params.id);

  if(!post){
    next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: post
  });

});

exports.getPostByUrl = asyncHandler(async (req, res, next) => {

  const post = await Post.findOne({ url: req.params.url }).populate('tags').select({
    'categories': 0,
    'views': 0
  });

  if(!post){
    return next(new ErrorResponse(`Post not found with url of ${req.params.url}`, 404));
  }

  res.status(200).json({
    success: true,
    data: post
  });

});

exports.getWebPosts = asyncHandler(async (req, res, next) => {

  res.status(200).json(res.postResults);

});

exports.createPost = asyncHandler(async (req, res, next) => {

  const files = { ...req.files };

  const data = { 
    ...req.body,
    image: files.image ? files.image[0].path : '',
    thumbnail: files.thumbnail ? files.thumbnail[0].path : '' 
  };

  const post = await Post.create(data);

  res.status(200).json({
    success: true,
    data: post
  });

});

exports.updatePost = asyncHandler(async (req, res, next) => {

  let post = await Post.findById(req.params.id);

  if(!post){
    next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
  }

  const postBody = {...req.body};

  const updatedImage = getUpdatedAsset(req, 'image');
  const updatedThumbnail = getUpdatedAsset(req, 'thumbnail');

  const data = { 
    ...postBody,
    image: updatedImage,
    thumbnail: updatedThumbnail
  };

  post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data : post
  });

});

exports.updatePosts = asyncHandler(async (req, res, next) => {

  await Post.updateMany({}, req.body);

  res.status(200).json({
    success: true,
    data: 'Posts updated.'
  });

});

exports.deletePost = asyncHandler(async (req, res, next) => {

  let post = await Post.findById(req.params.id);

  if(!post){
    next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
  }

  post.remove();

  res.status(200).json({
    success: true,
    data: {}
  });

});

exports.getMostRecent = asyncHandler(async (req, res, next) => {

  const recentPosts = await Post.find({})
  .sort({date_created: 'desc'})
  .select('title url thumbnail tags comments views date_created')
  .populate('tags')
  .populate('comments')
  .limit(process.env.TOTAL_RECENT_POSTS)
  .exec();

  res.status(200).json({
    success: true,
    data: recentPosts
  });

});

exports.getMostPopular = asyncHandler(async (req, res, next) => {

  const popularPosts = await Post.find({})
  .sort({views: 'desc'})
  .select('title url thumbnail tags comments views date_created')
  .populate('tags')
  .populate('comments')
  .limit(process.env.TOTAL_RECENT_POSTS)
  .exec();

  res.status(200).json({
    success: true,
    data: popularPosts
  });

});

exports.uploadImage = (req, res, next) => {

    const filedata = req.file || {};

    res.status(200).json({
      success: true,
      data: filedata
    });

};

exports.uploadThumbnail = (req, res, next) => {

  const filedata = req.file || {};

  res.status(200).json({
    success: true,
    data: filedata
  });
  
}

exports.uploadAssets = (req, res, next) => {

  const filedata = req.files || {};

  res.status(200).json({
    success: true,
    data: filedata
  });

}