const express = require('express');
const {
      getWebPosts,
      getPostByUrl,
      getMostRecent,
      getMostPopular
} = require('../../controllers/posts');

const { getPostResults } = require('../../middleware/postResults');
const Post = require('../../models/Post');

const comments = require('./comments');

const router = express();

router.use('/:postId/comments', comments);

router.route('/')
      .get(getPostResults, getWebPosts);

router.route('/recent')
      .get(getMostRecent);

router.route('/popular')
      .get(getMostPopular);

router.route('/:url')
      .get(getPostByUrl);

module.exports = router;