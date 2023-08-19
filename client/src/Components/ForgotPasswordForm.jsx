import axios from "axios";
import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/forgotpassword",
        {
          email,
        }
      );
      console.log("email sent successful:", response);

      setResponseMessage(`Link has been sent at "${email}" to reset Password`);
    } catch (error) {
      // Handle Login error here, e.g. display an error message
      console.error("Login error:", error);
      console.log(error.response.data.message);
      setResponseMessage(error.response.data.message);
    }
  };
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "48vh" }}
    >
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="teal" className="text-center">
          Forgot Password
        </Typography>
        {responseMessage ? (
          <p className="text-xl text-center">{responseMessage}!</p>
        ) : (
          <>
            <Typography color="teal" className="mt-1 font-normal text-center ">
              Enter your email to reset your password.
            </Typography>
            <form
              onSubmit={handleForgotPassword}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  color="teal"
                  size="lg"
                  label="Email"
                />
              </div>
              <Button type="submit" className="mt-2 bg-teal-600" fullWidth>
                Reset Password
              </Button>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}

export default ForgotPasswordForm;
