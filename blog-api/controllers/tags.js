const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Tag = require('../models/Tag');

exports.getTags = asyncHandler(async (req, res, next) => {

  const tags = await Tag.find();

  res.status(200).json(res.filteredResults);

});

exports.getTagOptions = asyncHandler(async (req, res, next) => {

  const tags = await Tag.find();

  res.status(200).json({
    success: true,
    data: tags
  });

});

exports.getTag = asyncHandler(async (req, res, next) => {

  const tag = await Tag.findById(req.params.id);

  if(!tag){
    next(new ErrorResponse(`Tag not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: tag
  });

});

exports.getTagsByName = asyncHandler(async (req, res, next) => {

  let tags;

  if(req.params.name){

    tags = await Tag.find({name: { '$regex': req.params.name, '$options': 'i' }});

  }
  else tags = await Tag.find();
  

  res.status(200).json({
    success: true,
    data: tags
  });

});

exports.getTagByUrl = asyncHandler(async (req, res, next) => {

  const tag = await Tag.findOne({url: req.params.url});

  if(!tag) {
    next(new ErrorResponse(`Could not find tag with url ${url}`, 404));
  }

  res.status(200).json({
    success: true,
    data: tag
  });

});


exports.createTag = asyncHandler(async (req, res, next) => {

  const tag = await Tag.create(req.body);

  res.status(200).json({
    success: true,
    data: tag
  });

});

exports.updateTag = asyncHandler(async (req, res, next) => {

  let tag = await Tag.findById(req.params.id);

  if(!tag){
    next(new ErrorResponse(`Tag not found with id of ${req.params.id}`, 404));
  }

  tag = await Tag.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: tag
  });

});

exports.deleteTag = asyncHandler(async (req, res, next) => {

  const tag = await Tag.findById(req.params.id);

  if(!tag){
    next(new ErrorResponse(`Tag not found with id of ${req.params.id}`, 404));
  }

  tag.remove();

  res.status(200).json({
    success: true,
    data: {}
  });

});