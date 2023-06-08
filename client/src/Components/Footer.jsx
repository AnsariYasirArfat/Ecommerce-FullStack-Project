import { Typography } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import mainLogo from "../Assets/mainLogo.png";

function Footer() {
  const LINKS = [
    {
      title: "Product",
      items: [
        { label: "Cleannig products", path: "" },
        { label: "Ladies Saree & Dress", path: "" },
        { label: "Spices", path: "" },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "About Us", path: "about" },
        { label: "Contact Us", path: "contact" },
      ],
    },
    // {
    //   title: "Contact Us",
    //   items: ["Blog", "Newsletter", "Events"],
    // },
  ];

  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="relative w-full bg-teal-600 py-6">
        <div className="mx-auto w-full max-w-7xl px-8">
          <div className="grid grid-cols-1 justify-between md:grid-cols-2">
            <Typography className="mb-6 ">
              <div>
                <NavLink
                  to="/"
                  className="cursor-pointer  flex items-center w-fit"
                >
                  <img
                    src={mainLogo}
                    alt="mainLogo"
                    className="w-12 rounded-full mr-4 "
                  />
                  <h1 className="text-xl font-bold text-teal-50">Zen Max</h1>
                </NavLink>
              </div>
            </Typography>

            <div className="grid grid-cols-2 justify-between gap-6">
              {LINKS.map(({ title, items }) => (
                <ul key={title}>
                  <Typography
                    variant="small"
                    color="teal"
                    className="mb-3 text-teal-50 sm:font-bold"
                  >
                    {title}
                  </Typography>
                  {items.map((item) => (
                    <li key={item.label}>
                      <Typography
                        as={NavLink}
                        to={`/${item.path}`}
                        color="gray"
                        className="w-fit py-1.5 sm:font-semibold transition-colors text-teal-200 hover:text-teal-900 hover:underline "
                      >
                        {item.label}
                      </Typography>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-teal-50 py-4 md:flex-row md:justify-between">
            <Typography
              variant="small"
              className="mb-4 text-center font-semibold text-teal-900 md:mb-0"
            >
              &copy; {currentYear}
              <a href="/" className="hover:text-teal-100 hover:underline mx-1 ">
                Zen Max Industries.
              </a>
              All Rights Reserved.
            </Typography>
            <div className="flex gap-4 text-teal-900 sm:justify-center p-1 bg-teal-200 hover:bg-teal-50 rounded-md">
              {/* GitHub */}
              <Typography
                as="a"
                href="https://github.com/AnsariYasirArfat"
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                <img
                  alt="github"
                  width={30}
                  src="https://img.icons8.com/windows/32/null/github.png"
                />
              </Typography>
              {/* LinkedIn */}
              <Typography
                as="a"
                href="https://www.linkedin.com/in/yaseer-ansari-364a25262/"
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                <img
                  src="https://img.icons8.com/color/48/null/linkedin.png"
                  alt="Linkedin"
                  width={30}
                />
              </Typography>
              {/* Hashnode */}
              <Typography
                as="a"
                href="https://ansariyasirarfat.hashnode.dev/"
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                <img
                  src="https://img.icons8.com/color/48/null/hashnode.png"
                  alt="hashnode"
                  width={30}
                />
              </Typography>
              <Typography
                as="a"
                href="#top"
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                <img
                  src="https://img.icons8.com/fluency/48/null/double-up.png"
                  width={25}
                  alt="Back to Top"
                />
              </Typography>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
