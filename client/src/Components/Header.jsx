import React from "react";
import {
  // Navbar,
  Collapse,
  // MobileNav,
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
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

import mainLogo from "../Assets/mainLogo.png";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

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
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
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
          color=""
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
          <Typography as="a" href="#" variant="small" className="font-normal">
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
      <MenuItem className="flex items-center gap-2 text-teal-600 lg:hidden font-bold">
        <ShoppingBagIcon className="h-[18px] w-[18px] " /> Products
      </MenuItem>
      <ul className="ml-6 flex  flex-col gap-1 lg:hidden">{renderItems}</ul>
    </React.Fragment>
  );
}

// nav list component
const navListItems = [
  {
    label: "About Us",
    imgIcon: "https://img.icons8.com/fluency-systems-regular/48/about.png",
  },
  {
    label: "Contact Us",
    imgIcon: "https://img.icons8.com/windows/32/phone-message.png",
  },
];

function NavList() {
  return (
    <ul className="mb-4 mt-2  flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <Typography
        as="a"
        href="#"
        variant="large"
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
      {navListItems.map(({ label, imgIcon }) => (
        <Typography
          key={label}
          as="a"
          href="#"
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
    <nav className="w-full  px-10 bg-teal-50 text-red-600">
      <div
        className="relative  flex items-center text-blue-gray-900"
        style={{ height: "12vh" }}
      >
        <Typography
          as="a"
          href="#"
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
