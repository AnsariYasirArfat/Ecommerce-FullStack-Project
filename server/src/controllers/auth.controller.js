import User from "../models/user.model.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/CustomError.js";
import mailHelper from "../services/mailHelper.js";
import crypto from "crypto";

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
    throw new CustomError("Please fill all Credentials", 400);
  }

  // Adding this user's Credentials data to database

  // But first check if user already exists?
  const exitingUser = await User.findOne({ email });
  if (exitingUser) {
    throw new CustomError("User already exists", 400);
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

  console.log("Cookies: ", req.cookies);
  // Sending token to client in response
  res.status(200).json({
    success: true,
    message: "Your Account created successfully",
    // token,
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
  console.log("login");
  const user = await User.findOne({ email }).select("+password");
  console.log(user);

  if (!user) {
    throw new CustomError("Invalid creadentials", 400);
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (isPasswordMatched) {
    const token = user.getJWTToken();

    res.cookie("token", token, cookieOptions);
    console.log("Cookies: ", req.cookies);

    return res.status(200).json({
      success: true,
      message: "You Logged in successfully",
      // token,
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
  console.log("Cookies_after_logout: ", req.cookies);

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
  console.log(resetToken);

  try {
    await user.save();
  } catch (error) {
    console.error("Error saving user:", error);
    throw new CustomError("Failed to save user", 500);
  }

  // const resetUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/auth/resetpassword/${resetToken}`;

  // console.log(resetUrl);

  // const message = `Your password reset token is as follows \n\n ${resetUrl} \n\n if this was not requested by you, please ignore.`;

  const message = `
  Subject: Reset Token For Your New Password

      Hello ${user.name},

      You've requested to reset your password. Please follow these simple steps to regain access to your account:

      1. Copy the Reset Token:  ${resetToken}  
      2. Go to the Reset Password Page.
      3. Paste the Reset Token: On the reset password page, you'll find a field to enter your reset token. 
      4. Create a new password and confirm it.
      5. Submit the Form to reset your password.

      Please note that for security reasons, the reset token will expire in 20 minutes.

      If you didn't request this password reset, please ignore this email.

      Thank you for using our services.

      Best regards,
      The Zen Max Team
  `;

  try {
    await mailHelper({
      email: user.email,
      subject: "Password reset mail",
      message,
    });
    res.status(200).json({
      success: true,
      email: user.email,
      subject: "Password reset mail",
    });
  } catch (error) {
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });

    console.error("Error sending email:", error);
    throw new CustomError("Email could not be sent", 500);
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

  console.log("resetToken: ", resetPasswordToken);

  const user = await User.findOne({
    forgotPasswordToken: resetPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });
  console.log("user", user);

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
    message: "Password reseted successfully",
  });
});

/**********************************************************
 * @checkTokenValidity
 * @route <URL>/api/v1/auth/checkTokenValidity
 * @description check token in cookies, then return flag
 * @returns Logged In User validity
 **********************************************************/
export const checkTokenValidity = asyncHandler(async (req, res) => {
  try {
    const user = req.user; // User object obtained from the middleware
    res.status(200).json({
      isAuthenticated: !!user, // Convert to boolean
    });
  } catch (error) {
    console.error("Error checking token validity:", error);
    res.status(500).json({
      isAuthenticated: false,
    });
  }
});
