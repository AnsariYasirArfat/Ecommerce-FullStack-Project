import { Card, Input, Button, Typography } from "@material-tailwind/react";

function ResetPasswordForm() {
  return (
    <div
      className="flex justify-center items-center m-4"
      style={{ height: "48vh" }}
    >
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="teal" className="text-center">
          Reset Password
        </Typography>
        <Typography color="teal" className="mt-1 font-normal text-center ">
          Enter your new password.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              color="teal"
              type="password"
              size="lg"
              label="New Password"
            />
            <Input
              color="teal"
              type="password"
              size="lg"
              label="Confirm Password"
            />
          </div>
          <Button className="mt-2 bg-teal-600" fullWidth>
            Reset Password
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default ResetPasswordForm;
