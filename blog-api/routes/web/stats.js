const express = require('express');
const { updatePostViews } = require('../../controllers/stats');

const router = express();

router.route('/updateviews/:postid')
      .put(updatePostViews);

module.exports = router;