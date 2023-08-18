import { Card, Input, Button, Typography } from "@material-tailwind/react";

function ForgotPasswordForm() {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "48vh" }}
    >
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="teal" className="text-center">
          Forgot Password
        </Typography>
        <Typography color="teal" className="mt-1 font-normal text-center ">
          Enter your email to reset your password.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input color="teal" size="lg" label="Email" />
          </div>
          <Button className="mt-2 bg-teal-600" fullWidth>
            Reset Password
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default ForgotPasswordForm;
