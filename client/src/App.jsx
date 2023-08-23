import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "./Store/reducers/authSlice";
import { CheckTokenValidity } from "./Services/authServices/authService";

function App() {
  const dispatch = useDispatch();
  const baseUrl = useSelector((state) => state.baseUrl.value);
  useEffect(() => {
    axios.defaults.withCredentials = true;
    async function getTokenValidityStatus() {
      try {
        const response = await CheckTokenValidity(baseUrl);
        dispatch(setIsAuthenticated(response.isAuthenticated));
        console.log(
          "You are already logged and have valid token: ",
          response.isAuthenticated
        );
      } catch (error) {
        console.error("Error checking token validity:", error);
      }
    }
    getTokenValidityStatus();
  }, [dispatch, baseUrl]);

  return (
    <>
      <div className="bg-white sm:bg-red-200 md:bg-green-300 lg:bg-yellow-200 xl:bg-blue-400 2xl:bg-teal-100">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
