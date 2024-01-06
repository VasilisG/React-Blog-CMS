const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { getSearchResults } = require('../utils/quicksearch');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Tag = require('../models/Tag');

const ALLOWED_TYPES = ['post', 'comment', 'tag', 'all'];
const POST_FIELDS = ['title', 'content', 'url'];
const COMMENT_FIELDS = ['content', 'url'];
const TAG_FIELDS = ['name'];

const POST_SELECT_FIELDS = {'title': 1};
const COMMENT_SELECT_FIELDS = {'content': 1};
const TAG_SELECT_FIELDS = {'name': 1};

exports.getSearchResults = asyncHandler(async (req, res, next) => {

  const queryParams = { ... req.query };

  if(!queryParams.q || !queryParams.type || !ALLOWED_TYPES.includes(queryParams.type)){
    next(new ErrorResponse('Invalid or missing quick search params.', 400));
  }

  else {
    
    const queryStr = queryParams.q;
    const queryType = queryParams.type;

    let data = {
      'posts': [],
      'comments': [],
      'tags': []
    };

    switch(queryType){
      case 'post':
        data['posts'] = await getSearchResults(Post, POST_FIELDS, queryStr, POST_SELECT_FIELDS);
        break;
      case 'comment':
        data['comments'] = await getSearchResults(Comment, COMMENT_FIELDS, queryStr, COMMENT_SELECT_FIELDS);
        break;
      case 'tag':
        data['tags'] = await getSearchResults(Comment, TAG_FIELDS, queryStr, TAG_SELECT_FIELDS);
        break;
      case 'all':
        data['posts'] = await getSearchResults(Post, POST_FIELDS, queryStr, POST_SELECT_FIELDS);
        data['comments'] = await getSearchResults(Comment, COMMENT_FIELDS, queryStr, COMMENT_SELECT_FIELDS);
        data['tags'] = await getSearchResults(Tag, TAG_FIELDS, queryStr, TAG_SELECT_FIELDS);
        break;
    }

    res.status(200).json({
      success: true,
      data
    });
  }

});