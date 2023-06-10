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
      <Card className="w-48 sm:w-52 md:w-60 lg:w-64 bg-opacity-[0.87] hover:bg-opacity-100 shadow-lg shadow-teal-900/60 hover:shadow-xl hover:shadow-teal-900/80">
        <CardHeader
          shadow={true}
          floated={false}
          className="h-44 sm:h-48 md:h-56 lg:h-60  m-3 md:m-4 lg:m-5  "
        >
          <img
            src={Product.Image}
            className="w-full h-full object-center object-cover rounded-lg shadow-2xl shadow-teal-950/50 hover:scale-110 ease-in-out duration-100"
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
        <CardFooter className="p-3 sm:p-4 md:p-5 ">
          {isWishlisted ? (
            <Button
              onClick={RemoveFromWishList}
              fullWidth={true}
              className="text-[10px] md:text-xs lg:text-sm  px-4 py-2 md:py-3 bg-teal-900/10 text-red-500 shadow-none hover:shadow-none  focus:shadow-none focus:scale-105 active:scale-100"
            >
              Remove from WishList
            </Button>
          ) : (
            <Button
              onClick={AddedToWishList}
              fullWidth={true}
              className="text-[10px] md:text-xs lg:text-sm px-4 py-2 md:py-3 bg-teal-900/10 text-teal-700 shadow-none hover:shadow-none  focus:shadow-none focus:scale-105 active:scale-100"
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
