const express = require('express');

const {
  getNotifications,
  getNotification,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification
} = require('../../controllers/notifications');
const { authenticate } = require('../../middleware/auth');

const router = express();

router.route('/')
  .get(authenticate, getNotifications)
  .post(createNotification);

router.route('/markAllAsRead')
  .put(authenticate, markAllAsRead);

router.route('/:id')
  .get(authenticate, getNotification)
  .put(authenticate, markAsRead)
  .delete(authenticate, deleteNotification);


module.exports = router;