import { NavLink } from "react-router-dom";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";

function ProductCard({ Product }) {
  return (
    <>
      <Card className="bg-teal-50 hover:bg-white justify-between w-40 h-64 md:w-44 md:h-72 lg:w-52 lg:h-80 2xl:w-60 2xl:h-[352px] bg-opacity-[0.87] hover:bg-opacity-100 shadow-lg shadow-teal-900/60 hover:shadow-xl hover:shadow-teal-900/80 ">
        <CardHeader
          shadow={true}
          floated={false}
          className="h-36 md:h-40 lg:h-48  2xl:h-56 m-3 md:m-4 lg:m-5  "
        >
          <NavLink to={`/productpage`}>
            <img
              src={Product.Image}
              className="w-full h-full object-center object-cover rounded-md shadow-2xl shadow-teal-950/50 hover:scale-110 ease-in-out duration-100"
            />
          </NavLink>
        </CardHeader>
        <CardBody className="px-4 py-0 lg:px-5">
          <div className="flex items-center justify-between ">
            <Typography
              color="teal"
              className="text-xs md:text-sm lg:text-base font-semibold"
            >
              {Product.Name}
            </Typography>
            <Typography
              color="teal"
              className="text-xs md:text-sm lg:text-base font-medium"
            >
              ${Product.Price}
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="p-3 md:p-4">
          <NavLink to={`/productpage`}>
            <Button
              fullWidth={true}
              className="flex items-center justify-center gap-1 lg:gap-2 text-[10px] md:text-[11px] lg:text-xs  2xl:text-sm py-2 md:py-3 bg-teal-100 text-teal-600 hover:shadow-none"
            >
              Learn More
              <ArrowLongRightIcon
                strokeWidth={2}
                className="w-3 md:w-4 lg:w-5"
              />
            </Button>
          </NavLink>
        </CardFooter>
      </Card>
    </>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  Product: PropTypes.object,
};
