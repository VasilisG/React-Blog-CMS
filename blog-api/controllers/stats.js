const Post = require('../models/Post');
const Comment = require('../models/Comment');
const asyncHandler = require('../middleware/async');
const { MOST_VIEWED_LIMIT } = require('../config/constants');
const ErrorResponse = require('../utils/errorResponse');

exports.getCommentStats = asyncHandler(async (req, res, next) => {

  const postCount = await Post.count();

  const commentCount = await Comment.count();

  const commentsPerPost = postCount > 0 ? commentCount / postCount : 0;

  let averageComments = 0;

  if(commentsPerPost > 0) {
    
    averageComments = commentsPerPost >= 1 ? Math.ceil(commentsPerPost) : 'Less than 1';
  }

  const previousDate = new Date();
  previousDate.setDate(previousDate.getDate() - 1);

  const latestComments = await Comment.count({ 
    $or: [
      { createdAt: { $gte: previousDate }},
      { createdAt: { $eq: previousDate }}
    ]
  });

  res.status(200).json({
    success: true,
    data: {
      total_comments: commentCount,
      average_comments: averageComments,
      latest_comments: latestComments
    }
  });

});

exports.getMostViewedPosts = asyncHandler(async (req, res, next) => {

  const posts = await Post.find().sort({ views: 'desc' }).limit(MOST_VIEWED_LIMIT);

  res.status(200).json({
    success: true,
    data: posts
  });

});

exports.updatePostViews = asyncHandler(async (req, res, next) => {

  const postId = req.params.postid;

  if(!postId) {
    return next(new ErrorResponse(`No post ID found.`, 400));
  }

  let post = Post.findById(postId);

  if(!post) {
    return next(new ErrorResponse(`Could not find post with ID: ${postId}.`, 400));
  }

  await post.findOneAndUpdate({ _id: postId }, {$inc: {'views': 1}});

  res.status(200).json({
    success: true,
    data: 'Post views updated.'
  });

});