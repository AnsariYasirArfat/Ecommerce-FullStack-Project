import { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "../../Store/reducers/authSlice";
import { SignUp } from "../../Services/authServices/authService";

function RegistrationForm() {
  const baseUrl = useSelector((state) => state.baseUrl.value);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [fieldError, setFieldError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!agreedToTerms) {
      setFieldError("Please agree to the Terms and Conditions.");
      return;
    }

    if (password !== confirmPassword) {
      setFieldError("Passwords do not match.");
      return;
    }

    try {
      const response = await SignUp(baseUrl, name, email, password);

      if (response.success) {
        dispatch(setIsAuthenticated(true));
        navigate("/");
      }
      console.log(response.message);
      console.log("Signup successful:", response);
    } catch (error) {
      console.error("Signup error:", error);
      console.log(error.message);
      setResponseMessage(error.message);
    }
  };
  return (
    <div className="flex justify-center m-4">
      <Card color="transparent" shadow={false}>
        <Typography variant="h3" color="teal" className="text-center">
          Sign Up
        </Typography>
        <Typography color="teal" className="mt-1 font-normal text-center ">
          Enter your details to register.
        </Typography>
        {responseMessage ? (
          <p className="text-xl text-center text-red-500">{responseMessage}!</p>
        ) : (
          ""
        )}
        <form
          onSubmit={handleSignup}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              onChange={(e) => setName(e.target.value)}
              color="teal"
              size="lg"
              label="Name"
              required
            />
            <Input
              onChange={(e) => setEmail(e.target.value)}
              color="teal"
              size="lg"
              required
              label="Email"
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              color="teal"
              type="password"
              size="lg"
              required
              label="Password"
            />
            <Input
              onChange={(e) => setconfirmPassword(e.target.value)}
              color="teal"
              type="password"
              size="lg"
              required
              label="Confirm Password"
            />
          </div>
          <p className="text-red-500">{fieldError}</p>
          <Checkbox
            name="agreedToTerms"
            required
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            color="teal"
            label={
              <Typography
                variant="small"
                color="teal"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="mt-6 bg-teal-600" fullWidth>
            Register
          </Button>
          <Typography color="teal" className="mt-4 text-center font-normal ">
            Already have an account?
            <NavLink
              to="/login"
              className="font-medium text-teal-900 pl-2 hover:underline"
            >
              Sign In
            </NavLink>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
export default RegistrationForm;
