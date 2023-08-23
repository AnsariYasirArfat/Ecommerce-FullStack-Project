import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "../Store/reducers/authSlice";
import { Login } from "../Services/authServices/authService";

function LoginForm() {
  const baseUrl = useSelector((state) => state.baseUrl.value);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const response = await Login(baseUrl, email, password);
      console.log("login response: ", response);
      if (response.success) {
        dispatch(setIsAuthenticated(true));
        navigate("/");
      }
      console.log(response.message);
    } catch (error) {
      console.error("Login error:", error);
      setResponseMessage(error.message);
    }
  };

  return (
    <div
      className="flex justify-center items-center "
      style={{ height: "52vh" }}
    >
      <Card color="transparent" shadow={false}>
        <Typography variant="h3" color="teal" className="text-center">
          Log In
        </Typography>
        <Typography color="teal" className="mt-1 font-normal text-center ">
          Enter your credentials to log in.
        </Typography>
        {responseMessage ? (
          <p className="text-xl text-center text-red-500">{responseMessage}!</p>
        ) : (
          ""
        )}
        <form
          onSubmit={handleLogIn}
          className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              color="teal"
              size="lg"
              label="Email"
              required
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              color="teal"
              type="password"
              size="lg"
              label="Password"
              required
            />
          </div>
          <Button type="submit" className="mt-2 bg-teal-600" fullWidth>
            Log In
          </Button>
          <Typography color="teal" className="mt-4 text-center font-normal ">
            <NavLink
              to="/forgotpassword"
              className="font-medium text-teal-900 hover:underline"
            >
              Forgot Password?
            </NavLink>
          </Typography>
          <Typography color="teal" className="mt-4 text-center font-normal ">
            Don&apos;t have an account?
            <NavLink
              to="/signup"
              className="font-medium text-teal-900 pl-2 hover:underline"
            >
              Sign Up
            </NavLink>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default LoginForm;
