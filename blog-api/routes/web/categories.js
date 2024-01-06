const express = require('express');
const { getCategoryTree, getCategoryByUrl, getCategoryPath } = require('../../controllers/categories');

const router = express();

router.route('/tree')
      .get(getCategoryTree);

router.route('/:url')
      .get(getCategoryByUrl);

router.route('/path/:url')
      .get(getCategoryPath);

module.exports = router;