const express = require('express');

const {
  getComments,
  addComment,
  updateComment,
  deleteComment,
  getCommentTree,
  getComment
} = require('../../controllers/comments');
const { authenticate } = require('../../middleware/auth');

const { filterData } = require('../../middleware/advancedResults');
const Comment = require('../../models/Comment');

const router = express.Router({ mergeParams: true });

router.route('/')
      .get(authenticate, filterData(Comment, [{ path: 'postId', select: {_id: 0, title: 1}}]), getComments)
      .post(authenticate, addComment);

router.route('/tree')
      .get(authenticate, getCommentTree);

router.route('/:id')
      .get(authenticate, getComment)
      .put(authenticate, updateComment)
      .delete(authenticate, deleteComment);

module.exports = router;