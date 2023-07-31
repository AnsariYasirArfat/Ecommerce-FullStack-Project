import User from "../models/user.model.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/CustomError.js";

export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

/******************************************************
 * @SIGNUP
 * @route <URL>/api/auth/signup
 * @description User signUp Controller for creating new user
 * @returns User Object
 ******************************************************/

export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // validation
  if (!name || !email || !password) {
    throw new CustomError("Please all Credentials", 400);
  }

  // Adding this user's Credentials data to database

  // But first check if user already exists?
  const exitingUser = await User.findOne({ email });
  if (exitingUser) {
    throw CustomError("User already exists", 400);
  }
  // Now add data
  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate Token of user
  const token = user.getJWTToken();

  // Store this token in user's cookie
  res.cookie("token", token, cookieOptions);

  // Sending token to client in response
  res.status(200).json({
    success: true,
    token,
  });
});

/*********************************************************
 * @LOGIN
 * @route <URL>/api/auth/login
 * @description User Login Controller for signing in the user
 * @returns User Object
 *********************************************************/

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Validation
  if (!email || !password) {
    throw new CustomError("Please fill all details", 400);
  }

  const user = User.findOne({ email }).select("+password");

  if (!user) {
    throw new CustomError("Invalid creadentials", 400);
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (isPasswordMatched) {
    const token = user.getJWTToken();
    res.cookie("token", token, cookieOptions);
    return res.status(200).json({
      success: true,
      token,
    });
  }
  throw new CustomError("Password is incorrect", 400);
});

/**********************************************************
 * @LOGOUT
 * @route <URL>/api/auth/logout
 * @description User Logout Controller for logging out the user
 * @description Removes token from cookies
 * @returns Success Message with "Logged Out"
 **********************************************************/

export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
