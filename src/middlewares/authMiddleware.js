const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

exports.protect = async (req, res, next) => {
  try {
   let token;
   if (
     req.headers.authorization &&
     req.headers.authorization.startsWith('Bearer')
   ) {
     token = req.headers.authorization.split(' ')[1];
   }
 
   if (!token) {
     return res.status(401).json({
      status:"error",
      message:"you are logged in! please log in to get access",
     });
   }
 
   const decoded = await promisify(jwt.verify)(
     token,
     process.env.SECRET_JWT_SEED
   );
 
   const user = await User.findOne({
     where: {
       id: decoded.id,
       status: true,
     },
   });
 
   if (!user) {
    return res.status(401).json({
     status:"error",
     message:"the owner of this token it not longer availble",
    });
   }
 
   req.sessionUser = user;
   next();   
  } catch (error) {
   return res.status(500).json({
    status:"fail",
    message:"internal server error",

    
   });
  }
}

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You do not have permission to perfom this action.!', 403)
      );
    }

    next();
  };
};