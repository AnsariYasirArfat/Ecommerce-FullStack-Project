import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

function RegistrationForm() {
  return (
    <div className="flex justify-center m-4">
      <Card color="transparent" shadow={false}>
        <Typography variant="h3" color="teal" className="text-center">
          Sign Up
        </Typography>
        <Typography color="teal" className="mt-1 font-normal text-center ">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input color="teal" size="lg" label="Name" />
            <Input color="teal" size="lg" label="Email" />
            <Input color="teal" type="password" size="lg" label="Password" />
            <Input
              color="teal"
              type="password"
              size="lg"
              label="Confirm Password"
            />
          </div>
          <Checkbox
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
          <Button className="mt-6 bg-teal-600" fullWidth>
            Register
          </Button>
          <Typography color="teal" className="mt-4 text-center font-normal ">
            Already have an account?
            <a
              href="#"
              className="font-medium text-teal-900 pl-2 hover:underline"
            >
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
export default RegistrationForm;
