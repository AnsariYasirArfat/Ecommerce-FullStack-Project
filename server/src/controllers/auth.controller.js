import User from "../models/user.model.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/CustomError.js";
import mailHelper from "../services/mailHelper.js";

export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

/******************************************************
 * @SIGNUP
 * @route <URL>/api/v1/auth/signup
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
 * @route <URL>/api/v1/auth/login
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
 * @route <URL>/api/v1/auth/logout
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

/**********************************************************
 * @GET_PROFILE
 * @route <URL>/api/v1/auth/profile
 * @description check token in cookies, if present then returns user details
 * @returns Logged In User Details
 **********************************************************/

export const getProfile = asyncHandler(async (req, res) => {
  const { user } = req;
  if (!user) {
    throw new CustomError("User Not Found", 401);
  }
  res.status(200).json({
    success: true,
    user,
  });
});

/**********************************************************
 * @forgotpassword
 * @route <URL>/api/v1/auth/forgotpassword
 * @description  Controller to handle forgot password requests.
 * @returns A JSON object with a success message.
 **********************************************************/
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError("User Not Found", 404);
  }

  const resetToken = user.generateForgetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `Your password reset token is as follows \n\n ${resetUrl} \n\n if this was not requested by you, please ignore.`;

  try {
    await mailHelper({
      email: user.email,
      subject: "Password reset mail",
      message,
    });
  } catch (error) {
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });

    throw new CustomError(error.message || "Email could not be sent", 500);
  }
});

/**********************************************************
@resetPassword
@route POST /api/v1/auth/resetpassword/:token
@description Controller to handle password reset requests.
@returns A JSON object with a success message and the user object.
**********************************************************/

export const resetPassword = asyncHandler(async (req, res) => {
  const { token: resetToken } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    throw new CustomError("Password does not match", 400);
  }

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: resetPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new CustomError("Password reset token in invalid or expired", 400);
  }

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save();

  const token = user.getJWTToken();
  res.cookie("token", token, cookieOptions);
  res.status(200).json({
    success: true,
  });
});
