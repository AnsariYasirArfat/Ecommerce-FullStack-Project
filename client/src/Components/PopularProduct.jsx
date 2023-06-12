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
        <h1 className="pb-5 text-xl sm:text-2xl xl:text-3xl 2xl:text-4xl  font-bold text-center text-teal-50">
          Popular Products
        </h1>
        <div className="pb-8 flex flex-wrap justify-center gap-4 sm:gap-9 md:gap-3 lg:gap-x-3  xl:gap-x-16 2xl:gap-x-20">
          {popularProducts.map((popularProduct) => {
            return (
              <ProductCard key={popularProduct.Name} Product={popularProduct} />
            );
          })}
        </div>
      </section>
    </>
  );
}

export default PopularProduct;
