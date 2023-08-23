import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "../../Store/reducers/authSlice";
import { ResetPassword } from "../../Services/authServices/authService";

function ResetPasswordForm() {
  const baseUrl = useSelector((state) => state.baseUrl.value);
  const dispatch = useDispatch();

  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const token = resetToken.trim();
    if (password !== confirmPassword) {
      setFieldError("Passwords do not match.");
      return;
    }
    try {
      const response = await ResetPassword(
        baseUrl,
        password,
        confirmPassword,
        token
      );

      if (response.success) {
        dispatch(setIsAuthenticated(true));
      }
      console.log(response.message);
      navigate("/");

      console.log("Password reseted: ", response);
    } catch (error) {
      console.error("Password reseted error:", error);
      console.log(error.message);
      setResponseMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center m-4">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="teal" className="text-center">
          Reset Password
        </Typography>
        {responseMessage ? (
          <p className="text-xl text-center text-red-500">{responseMessage}!</p>
        ) : (
          ""
        )}
        <Typography color="teal" className="mt-1 font-normal text-center">
          Please check your email for the reset token & instructions. <br />{" "}
          Copy the token and paste it below.
        </Typography>

        <form
          onSubmit={handleResetPassword}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              onChange={(e) => setResetToken(e.target.value)}
              color="teal"
              type="text"
              size="lg"
              label="Paste Reset Token Here"
              required
            />
            <Typography color="teal" className="mt-1 font-normal text-center ">
              Set your new password.
            </Typography>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              color="teal"
              type="password"
              size="lg"
              label="New Password"
              required
            />
            <Input
              onChange={(e) => setconfirmPassword(e.target.value)}
              color="teal"
              type="password"
              size="lg"
              label="Confirm Password"
              required
            />
          </div>
          <p className="text-red-500">{fieldError}</p>
          <Button type="submit" className="mt-2 bg-teal-600" fullWidth>
            Reset Password
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default ResetPasswordForm;
