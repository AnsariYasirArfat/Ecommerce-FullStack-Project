import { Card, Input, Button, Typography } from "@material-tailwind/react";

function LoginForm() {
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
        <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input color="teal" size="lg" label="Email" />
            <Input color="teal" type="password" size="lg" label="Password" />
          </div>
          <Button className="mt-2 bg-teal-600" fullWidth>
            Log In
          </Button>
          <Typography color="teal" className="mt-4 text-center font-normal ">
            <a href="#" className="font-medium text-teal-900 hover:underline">
              Forgot Password?
            </a>
          </Typography>
          <Typography color="teal" className="mt-4 text-center font-normal ">
            Don&apos;t have an account?
            <a
              href="#"
              className="font-medium text-teal-900 pl-2 hover:underline"
            >
              Sign Up
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default LoginForm;
