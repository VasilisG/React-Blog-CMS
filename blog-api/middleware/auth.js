const jwt = require('jsonwebtoken');
const { getCookie } = require("../utils/cookies");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./async");

const authenticate = asyncHandler(async (req, res, next) => {

    if(!req.headers.cookie || !req.headers.authorization.startsWith('Bearer')) {
        console.log('No authentication headers found.');
        return next(new ErrorResponse('Unathorized access', 401));
    }

    const token = req.headers.authorization.split('Bearer ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if(decodedToken.exp < Math.round(Date.now() / 1000)) {
            console.log('Date expired');
            return next(new ErrorResponse('Unathorized access', 401));
        }

        next();
    }
    catch(err) {
        console.log(err);
        return next(new ErrorResponse('Unathorized access', 401));
    }

    if(!token){
        console.log('No token found');
        return next(new ErrorResponse('Unathorized access', 401));
    }
});

module.exports = { authenticate };