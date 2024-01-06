const express = require('express');

const { createNotification } = require('../../controllers/notifications');

const router = express();

router.route('/')
  .post(createNotification);

module.exports = router;