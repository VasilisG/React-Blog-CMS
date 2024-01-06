const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Notification = require('../models/Notification');

exports.getNotifications = asyncHandler(async (req, res, next) => {

  const total = await Notification.count();

  const query = Notification.find();

  if(req.query.limit) {

    query.limit(req.query.limit);
  }

  query.sort({createdAt: 'desc'});

  const notifications = await query;

  res.status(200).json({
    success: true,
    data: notifications,
    total
  });

});

exports.getNotification = asyncHandler(async (req, res, next) => {

  const notification = await Notification.findById(req.params.id);

  if(!notification){

    next(new ErrorResponse(`Notification not found with id of ${req.params.id}`, 404));

  }

  res.status(200).json({
    success: true,
    data: notification
  });

});

exports.createNotification = asyncHandler(async (req, res, next) => {

  const notification = await Notification.create(req.body);

  res.status(200).json({
    success: true,
    data: notification
  });

});

exports.markAsRead = asyncHandler(async (req, res, next) => {

  let notification = await Notification.findById(req.params.id);

  if(!notification){

    next(new ErrorResponse(`Notification not found with id of ${req.params.id}`, 404));

  }

  notification = await Notification.findOneAndUpdate({ _id: req.params.id }, {isRead: true}, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data : notification
  });

});

exports.markAllAsRead = asyncHandler(async (req, res, next) => {

  await Notification.updateMany({}, {isRead: true});

  res.status(200).json({
    success: true,
    data: {}
  });

});

exports.deleteNotification = asyncHandler(async (req, res, next) => {

  let notification = await Notification.findById(req.params.id);

  if(!notification){

    next(new ErrorResponse(`Notification not found with id of ${req.params.id}`, 404));

  }

  notification.remove();

  res.status(200).json({
    success: true,
    data: {}
  });

});