const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

exports.register = asyncHandler(async (req, res, next) => {

  const { email, password } = req.body;

  const user = await User.create({
    email,
    password
  });

  sendCookieResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {

  const { email, password } = req.body;

  if(!email || !password) {
    return next(new ErrorResponse('Please provide the required credentials', 400));
  }

  let user = await User.findOne({ email }).select('+password');

  if(!user) {
    return next(new ErrorResponse('Invalid credentials.', 401));
  }

  const passwordMatch = await user.matchPassword(password);

  if(!passwordMatch) {
    return next(new ErrorResponse('Invalid credentials.', 401));
  }

  user = await User.findOneAndUpdate({ email }, { last_login: new Date() }, {
    new: true
  });

  sendCookieResponse(user, 200, res);
});

exports.logout = asyncHandler(async (req, res, next) => {

  const cookieOptions = {
    expires: new Date(1),
    httpOnly: false
  };

  res
  .cookie(process.env.JWT_COOKIE_NAME, '', cookieOptions)
  .cookie(process.env.JWT_COOKIE_EMAIL, '', cookieOptions)
  .cookie(process.env.JWT_COOKIE_LAST_LOGIN, '', cookieOptions)
  .cookie(process.env.JWT_COOKIE_PASSWORD_RESET_TOKEN, '', cookieOptions)
  .cookie(process.env.JWT_COOKIE_PASSWORD_RESET_EXPIRE, '', cookieOptions)
  .status(200).json({
    success: true,
    data: {}
  });
});

/**
 * Returns a response containing the signed token created.
 * @param {object} user The user model.
 * @param {number} statusCode The status code to be returned.
 * @param {object} res The response object of the route.
 */
const sendCookieResponse = (user, statusCode, res) => {

  const token = user.getSignedJwtToken();

  const cookieOptions = {
    expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRE)),
    httpOnly: false
  }

  if(process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  res.status(statusCode)
  .cookie(process.env.JWT_COOKIE_NAME, token, cookieOptions)
  .cookie(process.env.JWT_COOKIE_EMAIL, user.email, cookieOptions)
  .cookie(process.env.JWT_COOKIE_LAST_LOGIN, user.last_login, cookieOptions)
  .cookie(process.env.JWT_COOKIE_PASSWORD_RESET_TOKEN, user.resetPasswordToken, cookieOptions)
  .cookie(process.env.JWT_COOKIE_PASSWORD_RESET_EXPIRE, user.resetPasswordExpire, cookieOptions)
  .json({
    success: true,
    email: user.email,
    last_login: user.last_login,
    token 
  });
}