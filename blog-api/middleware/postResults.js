const constants = require('../config/constants');
const Post = require('../models/Post');
const Category = require('../models/Category');
const Tag = require('../models/Tag');

const getPostResults = async (req, res, next) => {

  // Getting query params.
  const queryParams = {};

  // Executing query.
  let results = [];

  // Pagination result.
  let pagination = {};

  // Filter based on category.
  if(req.query.categoryUrl){
    const category = await Category.findOne({url: req.query.categoryUrl}, '_id');
    if(category) {
      queryParams.categories = {'$in': [category._id.toString()]};
    }
    else {
      res.postResults = {
        success: true,
        count: 0,
        pagination,
        data: results,
        total: 0
      };
    
      return next();
    }
  }

  // Filter based on tag.
  else if(req.query.tagUrl){
    const tag = await Tag.findOne({url: req.query.tagUrl}, '_id');
    if(tag) {
      queryParams.tags = {'$in': [tag._id.toString()]};
    }
    else {
      res.postResults = {
        success: true,
        count: 0,
        pagination,
        data: results,
        total: 0
      };
    
      return next();
    }
  }

  // Filter based on name query.
  else if(req.query.q){
    queryParams.title = { '$regex': req.query.q, '$options': 'i' };
  }

  // Get all enabled posts.
  // queryParams.enabled = 1;

  // Create mongoDB find() parameters.
  let queryStr = JSON.stringify(queryParams);

  // Getting data.
  let query = Post.find(JSON.parse(queryStr));

  // Selecting fields.
  query.select('title url thumbnail tags comments views date_created');

  // Sort data.
  query.sort({createdAt: 'desc'});
  
  // Pagination variables.
  const page = req.query.p ? parseInt(req.query.p) : constants.CURRENT_PAGE;
  const startIndex = (page - 1) * constants.LIMIT;
  const endIndex = page * constants.LIMIT;
  const total = await Post.count({ ... queryParams });
  const totalPages = Math.ceil(total / constants.LIMIT);

  query.skip(startIndex).limit(constants.LIMIT);

  // Populate with other documents.
  query = query.populate('tags');

  // Executing query.
  results = await query;

  pagination.totalPages = totalPages;
  pagination.page = page;

  if(endIndex < total) {
    pagination.next = {
      page: page + 1,
    };
  }

  else {
    pagination.next = {
      page: total,
    };
  }

  if(startIndex > total) {
    pagination.prev = {
      page: page - 1,
    };
  }

  else {
    pagination.prev = {
      page: 1,
    };
  }

  res.postResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
    total
  };

  next();
}

module.exports = {getPostResults};