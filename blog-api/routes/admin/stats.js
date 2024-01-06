const express = require('express');
const { authenticate } = require('../../middleware/auth');
const { getCommentStats, getMostViewedPosts } = require('../../controllers/stats');

const router = express();

router.route('/comments').get(authenticate, getCommentStats);
router.route('/mostviewed').get(authenticate, getMostViewedPosts);

module.exports = router;