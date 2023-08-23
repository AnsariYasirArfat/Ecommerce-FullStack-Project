import axios from "axios";

/**********************************************************
 * @SIGNUP
 * @description Service for user registration
 * @param {string} baseUrl - The base URL of the backend server
 * @param {string} name - User's name
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns Response data from the API
 **********************************************************/
export const SignUp = async (baseUrl, name, email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/auth/signup`, {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**********************************************************
 * @LOGIN
 * @description Service for user login
 * @param {string} baseUrl - The base URL of the backend server
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns Response data from the API
 **********************************************************/
export const Login = async (baseUrl, email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/auth/login`, {
      email,
      password,
    });
    // console.log("LogIn successful:", response.data);
    return response.data;
  } catch (error) {
    // console.log("login error:", error.response.data);
    throw error.response.data;
  }
};

/**********************************************************
 * @LOGOUT
 * @description Service for user logout
 * @param {string} baseUrl - The base URL of the backend server
 * @returns Response data from the API
 **********************************************************/
export const LogOut = async (baseUrl) => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/auth/logout`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**********************************************************
 * @PROFILE
 * @description Service for fetching user profile data
 * @param {string} baseUrl - The base URL of the backend server
 * @returns Response data from the API
 **********************************************************/
export const Profile = async (baseUrl) => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/auth/profile`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**********************************************************
 * @FORGOTPASSWORD
 * @description Service for requesting password reset
 * @param {string} baseUrl - The base URL of the backend server
 * @param {string} email - User's email
 * @returns Response data from the API
 **********************************************************/
export const ForgotPassword = async (baseUrl, email) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/auth/forgotpassword`, {
      email,
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**********************************************************
 * @RESETPASSWORD
 * @description Service for resetting user password
 * @param {string} baseUrl - The base URL of the backend server
 * @param {string} password - New password
 * @param {string} confirmPassword - Confirm new password
 * @param {string} token - Password reset token
 * @returns Response data from the API
 **********************************************************/
export const ResetPassword = async (
  baseUrl,
  password,
  confirmPassword,
  token
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/auth/resetpassword/${token}`,
      {
        password,
        confirmPassword,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**********************************************************
 * @CHECKTOKENVALIDITY
 * @description Service for checking the validity of a token
 * @param {string} baseUrl - The base URL of the backend server
 * @returns Response data from the API
 **********************************************************/
export const CheckTokenValidity = async (baseUrl) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/auth/checkTokenValidity`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
