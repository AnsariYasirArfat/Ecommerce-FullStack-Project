import productImage from "../Assets/product.png";
import ProductCard from "./ProductCard";
function PopularProduct() {
  const popularProducts = [
    {
      Name: "White Powder",
      Price: "100",
      Image: productImage,
    },
    {
      Name: "Blue Powder",
      Price: "100",
      Image: productImage,
    },
    {
      Name: "Blue Liquid",
      Price: "100",
      Image: productImage,
    },
    {
      Name: "Green Liquid",
      Price: "100",
      Image: productImage,
    },
  ];
  return (
    <>
      <section className="my-8 mx-3 sm:mx-6 md:mx-8 lg:mx-5 p-5 bg-teal-300 rounded-lg">
        <h1 className="pb-5 text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl  font-bold text-center text-teal-50">
          Popular Products
        </h1>
        <div className="flex flex-wrap justify-center sm:justify-evenly">
          {popularProducts.map((popularProduct) => {
            return (
              <ProductCard
                key={popularProduct.product}
                Product={popularProduct}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}

export default PopularProduct;
