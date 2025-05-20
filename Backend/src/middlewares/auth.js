const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, "No token Provided"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if(!user){
        throw new ApiError(httpStatus.UNAUTHORIZED,'User not Found');
    }
    req.user=user;
    next();
  } catch (error) {
    next(new ApiError(httpStatus.UNAUTHORIZED,'Invalid token'))
  }
};


module.exports=auth;
