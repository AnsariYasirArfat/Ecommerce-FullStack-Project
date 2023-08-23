import React from "react";
import { NavLink } from "react-router-dom";
import mainLogo from "../Assets/mainLogo.png";
import {
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  ShoppingBagIcon,
  ChevronDownIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

import { useSelector, useDispatch } from "react-redux";
import { setIsAuthenticated } from "../Store/reducers/authSlice";
import { LogOut } from "../Services/authServices/authService";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    imgIcon:
      "https://img.icons8.com/external-flat-icons-inmotus-design/67/external-login-telegram-flat-icons-inmotus-design.png",
    path: "profile",
  },
  {
    label: "Orders",
    imgIcon:
      "https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/64/external-logistics-shipping-delivery-kmg-design-detailed-outline-kmg-design-2.png",
    path: "orders",
  },
  {
    label: "Wishlist",
    imgIcon: "https://img.icons8.com/carbon-copy/100/wish-list.png",
    path: "wishlist",
  },
  {
    label: "Coupon",
    imgIcon:
      "https://img.icons8.com/external-line-lima-studio/64/external-discount-sale-line-lima-studio-5.png",
    path: "coupon",
  },
  {
    label: "Shop Cart",
    imgIcon: "https://img.icons8.com/ios/50/add-shopping-cart--v1.png",
    path: "shopcart",
  },
  {
    label: "Log Out",
    imgIcon: "https://img.icons8.com/ios-filled/50/logout-rounded-up.png",
    path: "",
  },
];

const signupItems = [
  {
    label: "Sign Up",
    imgIcon:
      "https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/external-user-medical-kiranshastry-lineal-kiranshastry.png",
    path: "signup",
  },
  {
    label: "Log In",
    imgIcon: "https://img.icons8.com/ios-filled/50/login-rounded-right.png",
    path: "login",
  },
];

function ProfileMenu() {
  let arrayItems;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const baseUrl = useSelector((state) => state.baseUrl.value);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  if (isAuthenticated) {
    arrayItems = profileMenuItems;
  } else {
    arrayItems = signupItems;
  }

  const handleLogout = async () => {
    try {
      const response = await LogOut(baseUrl);
      if (response.success) {
        dispatch(setIsAuthenticated(false));
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            className="border border-blue-500 p-0.5"
            src="https://img.icons8.com/pastel-glyph/64/user-male-circle.png"
            alt="user-male-circle"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {arrayItems.map(({ label, imgIcon, path }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={` rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              <Typography
                as={NavLink}
                to={`/${path}`}
                variant="small"
                onClick={() => {
                  if (label === "Log Out") {
                    handleLogout();
                  }
                }}
                className="font-normal flex items-center gap-2 "
                color={isLastItem ? "red" : "inherit"}
              >
                <img
                  src={imgIcon}
                  alt=""
                  className={`h-[18px] w-[18px] ${
                    isLastItem ? "text-red-500" : ""
                  }`}
                />
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

// nav list menu
const navListMenuItems = [
  {
    title: "Cleannig products",
    description: "",
  },
  {
    title: "Ladies Saree & Dress",
    description: "",
  },
  {
    title: "Spices",
    description: "",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setIsMenuOpen(true),
    onMouseLeave: () => setIsMenuOpen(false),
  };

  const renderItems = navListMenuItems.map(({ title, description }) => (
    <a href="#" key={title}>
      <MenuItem>
        <Typography
          variant="h6"
          className="text-teal-700 bg-teal-50 mb-1 p-2 rounded-lg"
        >
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography
            as={NavLink}
            to="/product"
            variant="small"
            className="font-normal"
          >
            <MenuItem
              {...triggers}
              className="hidden items-center gap-2 text-teal-600 lg:flex font-bold"
            >
              <ShoppingBagIcon className="h-[18px] w-[18px]" /> Products
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList
          {...triggers}
          className="hidden w-[36rem] grid-cols-7 gap-3  lg:grid"
        >
          <Card
            color="teal"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center"
          >
            <img src={mainLogo} className="h-28 w-28  rounded-full" />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <NavLink to="/product">
        <MenuItem className="flex items-center gap-2 text-teal-600 lg:hidden font-bold">
          <ShoppingBagIcon className="h-[18px] w-[18px] " /> Products
        </MenuItem>
      </NavLink>
      <ul className="ml-6 flex  flex-col gap-1 lg:hidden">{renderItems}</ul>
    </React.Fragment>
  );
}

// nav list component
const navListItems = [
  {
    label: "About Us",
    path: "about",
    imgIcon: "https://img.icons8.com/fluency-systems-regular/48/about.png",
  },
  {
    label: "Contact Us",
    path: "contact",
    imgIcon: "https://img.icons8.com/windows/32/phone-message.png",
  },
];

function NavList() {
  return (
    <ul className="mb-4 mt-2  flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <Typography
        as={NavLink}
        to="/"
        variant="h5"
        color="teal"
        className="font-normal"
      >
        <MenuItem className="flex items-center gap-2 font-bold">
          <img
            src="https://img.icons8.com/material-outlined/24/home--v2.png"
            alt=""
            className="h-[18px] w-[18px]"
          />
          Home
        </MenuItem>
      </Typography>
      <NavListMenu />
      {navListItems.map(({ label, imgIcon, path }) => (
        <Typography
          key={label}
          as={NavLink}
          to={`/${path}`}
          variant="small"
          color="teal"
          className="font-normal"
        >
          <MenuItem className="flex items-center gap-2 font-bold">
            <img src={imgIcon} alt="" className="h-[18px] w-[18px]" />
            {label}
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}

function Header() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full px-10 bg-teal-50 text-red-600">
      <div
        className="relative  flex items-center text-blue-gray-900"
        style={{ height: "12vh" }}
      >
        <Typography
          as={NavLink}
          to="/"
          className="ml-2 cursor-pointer py-1.5 flex items-center"
        >
          <img
            src={mainLogo}
            alt="mainLogo"
            className="w-12 rounded-full mr-4 "
          />
          <h1 className="text-xl font-bold text-teal-800">Zen Max</h1>
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="teal"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-4 lg:hidden"
        >
          <Bars3Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <Collapse open={isNavOpen} className="">
        <NavList />
      </Collapse>
    </nav>
  );
}
export default Header;
