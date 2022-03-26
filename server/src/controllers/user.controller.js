import {
  userRegisterValidation,
  userLoginValidation,
} from "../utils/validation.util.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// @desc Register new user
// @route Post /api/users/register
// @access Public
export const registerUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const { error } = userRegisterValidation.validate(req.body);
  const errMsg = error?.details[0]?.message;
  if (error) {
    return res.status(400).json({ msg: errMsg });
  }
  try {
    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "Email already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashed,
      });
      if (user) {
        return res.status(201).json({ msg: "Registration successful" });
      } else {
        return res.status(400).json({ msg: "Invalid user data" });
      }
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// @desc Login registered user
// @route Post /api/users/login
// @access Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { error } = userLoginValidation.validate(req.body);
  const errMsg = error?.details[0]?.message;

  if (error) {
    return res.status(400).json({ msg: errMsg });
  }

  try {
    // check for registered email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "no user found" });
    }

    // if user exists
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }
    // if password match then
    const token = jwt.sign({ data: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return res.status(200).json({
      id: user._id,
      fullname: user.firstname + " " + user.lastname,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// @desc get loggedin user
// @route get /api/user
// @access Private
export const getCurrentUser = async (req, res) => {
  try {
    const { _id, firstname, lastname, email } = await User.findById(req.user);
    res.status(200).json({
      id: _id,
      fullname: firstname + " " + lastname,
      email: email,
    });
  } catch (error) {
    console.log(error.message);
  }
};
