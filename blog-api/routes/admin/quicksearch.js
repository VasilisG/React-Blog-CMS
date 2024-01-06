const express = require('express');
const { authenticate } = require('../../middleware/auth');
const { getSearchResults } = require('../../controllers/quicksearch');

const router = express();

router.route('/')
      .get(authenticate, getSearchResults);

module.exports = router;