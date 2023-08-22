import React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Store/store";

import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import App from "./App.jsx";

import MainBody from "./Components/MainBody";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import ProductList from "./Components/ProductList";
import ProductPage from "./Components/ProductPage";
import RegistrationForm from "./Components/SignUp";
import LoginForm from "./Components/Login";
import ForgotPasswordForm from "./Components/ForgotPasswordForm";
import ResetPasswordForm from "./Components/ResetPassword";
import Profile from "./Components/Profile";

export const MainSection = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<MainBody />} />
        <Route path="signup" element={<RegistrationForm />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="forgotpassword" element={<ForgotPasswordForm />} />
        <Route path="resetpassword" element={<ResetPasswordForm />} />
        <Route path="profile" element={<Profile />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="product" element={<ProductList />} />
        <Route path="productpage" element={<ProductPage />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={MainSection} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
