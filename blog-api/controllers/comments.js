const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Comment = require('../models/Comment');
const { createCommentTree } = require('../utils/comments');

exports.getComments = asyncHandler(async (req, res, next) => {

  if(req.params.postId){

    const comments = await Comment.find({
      postId: req.params.postId
    });

    return res.status(200).json({
      success: true,
      count: comments.length,
      data: comments
    });
  }
  else {
    const filteredResults = res.filteredResults;
    const mappedData = filteredResults.data.map(item => {
       return {
        ...item._doc,
        postId: item.postId.title
       }
    });
    filteredResults.data = mappedData;
    res.status(200).json(filteredResults);
  }
});

exports.getComment = asyncHandler(async (req, res, next) => {

  const comment = await Comment.findById(req.params.id).populate('postId');

  res.status(200).json({
    success: true,
    data: comment
  });

});

exports.getCommentTree = asyncHandler(async (req, res, next) => {

    if(!req.params.postId){
      return next(new ErrorResponse('Post ID was not found in request.', 400));
    }

    const comments = await Comment.find({
      postId: req.params.postId
    }).lean();

    const total = await Comment.count({ postId: req.params.postId });

    const commentTree = createCommentTree(comments);

    res.status(200).json({
      success: true,
      count: total,
      data: commentTree
    });
});

exports.addComment = asyncHandler(async (req, res, next) => {

  const comment = await Comment.create(req.body);

  res.status(200).json({
    success: true,
    data: comment
  });

});

exports.updateComment = asyncHandler(async (req, res, next) => {

  let comment = await Comment.findById(req.params.id);

  if(!comment){
    next(new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404));
  }

  comment = await Comment.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: comment
  });

});

exports.deleteComment = asyncHandler(async (req, res, next) => {

  const comment = await Comment.findById(req.params.id);

  if(!comment){
    next(new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404));
  }

  await comment.remove();

  res.status(200).json({
    success: true,
    data: []
  });

});