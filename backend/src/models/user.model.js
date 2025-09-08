import mongoose from "mongoose";
import jwt from "jsonwebtoken"; //jwt is json web token used for tokens
import bcrypt from "bcryptjs"; //bcrypt use to encrypt decrypt password
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true, //to create an index for faster search
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    refreshToken: {
      type: String,
    },
  },

  { timesstamp: true }
);
userSchema.pre("save", async function (next) {
  //pre hook used befor data going to be saved it encrypt the password,
  //pre is a mongoose middleware it is a hook
  if (!this.isModified("password")) {
    //if password is not modified then next
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10); //hash the password with salt/rounds 10
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); //compare the password with hashed password
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
