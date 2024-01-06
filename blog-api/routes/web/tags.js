const express = require('express');
const { getTagByUrl } = require('../../controllers/tags');

const router = express();

router.route('/:url')
      .get(getTagByUrl);

module.exports = router;