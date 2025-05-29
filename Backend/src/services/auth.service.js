const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

const register = async (data) => {
  const { username, email, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const user = new User({ username, email, password });
  await user.save();

  return { user };
};

const login = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or Password");
  }

  const isMatch = await user.doesPasswordMatch(password);
  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  const token = createToken(user);
  return { user, token };
};

const loginWithGoogle = async (profile, authType) => {
  const googleId = profile.id;
  const email = profile.emails[0].value;
  const username = profile.displayname;
  const avatar = profile.photos[0].value;

  const existingUser = await User.findOne({ googleId });

  if (authType === "login") {
    if (!existingUser) {
      throw new Error(
        httpStatus.NOT_FOUND,
        "Account not found.Please sign up first"
      );
    }
    const token = createToken(existingUser);
    return { user: existingUser, token };
  }

  if (authType === "signup") {
    if (existingUser) {
      throw new Error(
        httpStatus.CONFLICT,
        "User already exisits.Please log in"
      );
    }

    //check if user is available in local records
    const emailUser = await User.findOne({ email });
    if (emailUser) {
      throw new Error(
        httpStatus.CONFLICT,
        "Email already used for local signup,Please use password login"
      );
    }

    const newUser = await User.create({
      googleId,
      email,
      username,
      avatar,
    });

    //login immediately after signup 
    const token = createToken(newUser);
    return { user: newUser, token };
  }

  throw new Error(httpStatus.BAD_REQUEST, "Invalid authentication type");
};

module.exports = { register, login, loginWithGoogle };
