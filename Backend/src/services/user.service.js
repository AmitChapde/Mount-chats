const  User  = require("../models/user.model");
const httpStatus = require("http-status");
const ApiError=require('../utils/ApiError')

async function getUserById(id) {
  const user = await User.findById(id);
  return user;
}

async function getUserByEmail(email) {
  const user = await User.findOne({ email });
  return user;
}

async function createUser(user) {
  const isExist = await User.isEmailTaken(user.email);

  if (isExist) {
    throw new ApiError(httpStatus.OK, "Email is already Taken");
  }

  const newUser = await User.create(user);
  return newUser;
}

async function getAllUsers() {
  return await User.find();
}

module.exports = { getUserById, getUserByEmail, createUser ,getAllUsers};
