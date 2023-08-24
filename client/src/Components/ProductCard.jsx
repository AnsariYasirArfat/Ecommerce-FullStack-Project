import { NavLink } from "react-router-dom";
// import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Rating,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import redHeart from "../Assets/redHeart.png";
import whiteHeart from "../Assets/whiteHeart.png";

function ProductCard({ Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const toggleFavorite = () => {
    if (isWishlisted) {
      setIsWishlisted(false);
    } else {
      setIsWishlisted(true);
    }
  };

  return (
    <>
      <Card className="bg-teal-50 hover:bg-white justify-between w-40 h-64 md:w-44 md:h-72 lg:w-56 lg:h-80 2xl:w-64 2xl:h-[368px] bg-opacity-[0.87] hover:bg-opacity-100 shadow-lg shadow-teal-900/60 hover:shadow-xl hover:shadow-teal-900/80 ">
        <button
          onClick={toggleFavorite}
          className="absolute z-50 top-4 right-4"
        >
          <img
            className="w-5 xl:w-7 ms-2"
            src={isWishlisted ? redHeart : whiteHeart}
            alt=""
          />
        </button>
        <CardHeader
          shadow={true}
          floated={false}
          className="h-36 md:h-40 lg:h-48 2xl:h-56 m-1 lg:m-2 lg:mb-0 relative"
        >
          <NavLink to={`/productpage`}>
            <img
              src={Product.Image}
              className="w-full h-full object-center object-cover rounded-md shadow-2xl shadow-teal-950/50 hover:scale-105 ease-in-out duration-500"
            />
          </NavLink>
        </CardHeader>
        <CardBody className="p-1 lg:px-5 text-center">
          <NavLink to={`/productpage`}>
            <div className="flex items-center justify-between">
              <Typography
                color="teal"
                className="text-xs md:text-sm lg:text-[15px] 2xl:text-base font-semibold capitalize p-1 truncate"
              >
                {Product.Name}
              </Typography>
              <Typography
                color="teal"
                className="text-xs md:text-sm lg:text-base font-medium"
              >
                ₹{Product.Price}
              </Typography>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Rating value={4} />
              <Typography
                color="blue-gray"
                className=" text-[10.5px] md:text-xs lg:text-sm font-medium  "
              >
                {4}.0
              </Typography>
            </div>
          </NavLink>
        </CardBody>
        <CardFooter className="p-1 lg:p-2">
          <Button
            fullWidth={true}
            className="flex items-center justify-center gap-1 lg:gap-2 text-[10px] md:text-[11px] lg:text-xs  2xl:text-sm p-2 bg-teal-100 text-teal-600 hover:shadow-none"
          >
            Add to Cart
            {/* <ArrowLongRightIcon strokeWidth={2} className="w-3 md:w-4 lg:w-5" /> */}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  Product: PropTypes.object,
};
