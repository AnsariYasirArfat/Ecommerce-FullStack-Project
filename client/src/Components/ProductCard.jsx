import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import PropTypes from "prop-types";

function ProductCard({ Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const AddedToWishList = () => {
    setIsWishlisted(true);
  };
  const RemoveFromWishList = () => {
    setIsWishlisted(false);
  };
  return (
    <>
      <Card className="justify-between w-40 h-64 md:w-44 md:h-72 lg:w-52 lg:h-80 2xl:w-60 2xl:h-[352px] bg-opacity-[0.87] hover:bg-opacity-100 shadow-lg shadow-teal-900/60 hover:shadow-xl hover:shadow-teal-900/80 ">
        <CardHeader
          shadow={true}
          floated={false}
          className="h-36 md:h-40 lg:h-48  2xl:h-56 m-3 md:m-4 lg:m-5  "
        >
          <img
            src={Product.Image}
            className="w-full h-full object-center object-cover rounded-md shadow-2xl shadow-teal-950/50 hover:scale-110 ease-in-out duration-100"
          />
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
        <CardFooter className="p-3 sm:p-4">
          {isWishlisted ? (
            <Button
              onClick={RemoveFromWishList}
              fullWidth={true}
              className="text-[8.5px] md:text-[9.5px] lg:text-xs px-0 py-2 md:py-3 bg-teal-900/10 text-red-500 shadow-none "
            >
              Remove from WishList
            </Button>
          ) : (
            <Button
              onClick={AddedToWishList}
              fullWidth={true}
              className="text-[9px] md:text-[9.5px] lg:text-xs py-2 md:py-3 bg-teal-900/10 text-teal-700 shadow-none "
            >
              Add to WishList
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  Product: PropTypes.object,
};

// m-2 sm:mb-6 md:m-8 xl:mx-1
