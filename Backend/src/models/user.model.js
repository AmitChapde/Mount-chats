const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: (value) => {
        if (validator.isEmail(value)) return true;
        else return false;
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      lowercase:true,
      minLength: 8,
      validate(value) {
        if(!value) return;
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    avatar: String,
  },
  { timestamps: true }
);

/**
 * check if email is taken
 * @param {string} email -users email
 * @returns {Promise<boolean>}
 */

userSchema.statics.isEmailTaken = async function (email) {
  const result = await this.find({ email: email });
  if (result.length) return true;
  else return false;
};

userSchema.pre("save", function (next) {
  let user = this;
  const saltRounds = 10;

  if (!user.isModified("password") || !user.password) return next();

  bcrypt.hash(user.password, saltRounds, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

/**
 * check if entered password mataches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 *
 */

userSchema.methods.doesPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("Users", userSchema);

module.exports = User;
