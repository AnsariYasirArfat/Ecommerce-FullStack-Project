import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import productImage from "../Assets/product.png";
import ProductCard from "./ProductCard";

function ProductList() {
  const data = [
    {
      label: "All",
      value: "all",
      products: [
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
      ],
    },
    {
      label: "Powder",
      value: "powder",
      products: [
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
      ],
    },
    {
      label: "Liquid",
      value: "liquid",
      products: [
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
      ],
    },
  ];

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold text-center p-4 text-teal-900">
          ProductList
        </h1>
      </div>
      <Tabs
        id="custom-animation"
        value="all"
        className="flex flex-col md:flex-row relative"
      >
        <TabsHeader className="sticky top-0 flex flex-row md:flex-col md:w-32">
          {data.map(({ label, value }) => (
            <Tab key={value} value={value} className="bg-teal-100">
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 400 },
            mount: { y: 0 },
            unmount: { y: 400 },
          }}
        >
          {data.map(({ value, products }) => (
            <TabPanel key={value} value={value} className="py-0 flex flex-wrap">
              {products.map((product) => {
                return <ProductCard key={product.Name} Product={product} />;
              })}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </>
  );
}

export default ProductList;
