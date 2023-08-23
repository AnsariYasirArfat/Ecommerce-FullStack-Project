import { useEffect, useState } from "react";
import { Card, Button, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "../../Store/reducers/authSlice";

import { useNavigate } from "react-router-dom";
import { LogOut, Profile } from "../../Services/authServices/authService";

function UserProfile() {
  const baseUrl = useSelector((state) => state.baseUrl.value);

  const [user, setUser] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserProfile() {
      try {
        const response = await Profile(baseUrl);
        setUser(response.user);
      } catch (error) {
        console.error("Error fetching user details: ", error);
      }
    }
    getUserProfile();
  }, [baseUrl]);

  const handleLogout = async () => {
    try {
      const response = await LogOut(baseUrl);
      if (response.success) {
        dispatch(setIsAuthenticated(false));
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div
      className="flex justify-center items-center "
      style={{ height: "48vh" }}
    >
      <Card color="transparent" shadow={false}>
        <Typography variant="h4">Personal Information</Typography>
        {user && (
          <>
            <Typography variant="h6">Name: {user.name}</Typography>

            <Typography>Email: {user.email}</Typography>

            <Typography>Role: {user.role}</Typography>

            <Button
              onClick={handleLogout}
              className="mt-8 w-24 mx-auto bg-red-600"
            >
              Logout
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}

export default UserProfile;
