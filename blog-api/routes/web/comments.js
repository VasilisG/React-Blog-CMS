const express = require('express');
const { getComments, addComment, getCommentTree } = require('../../controllers/comments');

const router = express.Router({mergeParams: true});

router.route('/')
      .get(getComments)
      .post(addComment);

router.route('/tree')
      .get(getCommentTree);

module.exports = router;