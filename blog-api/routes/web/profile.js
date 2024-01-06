const express = require('express');
const { getProfile } = require('../../controllers/profile');

const router = express();

router.route('/')
    .get(getProfile);

module.exports = router;