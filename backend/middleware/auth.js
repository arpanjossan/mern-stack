const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthanticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  console.log(token);
  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodeData);
  req.user = await User.findById(decodeData.id);
  next();
});

// Authorized Roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
    return next(  new ErrorHandler(
        `Roles : ${req.user.role} is not allowed to access this resource`,
        403
      ));
    }
    next();
  };
};
