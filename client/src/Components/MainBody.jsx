import { Typography } from "@material-tailwind/react";
import PopularProduct from "./PopularProduct";

function MainBody() {
  return (
    <>
      {/* Banners' Section */}
      <section className=" py-4 px-2 sm:px-6 md:px-16 lg:px-4 flex flex-col items-center lg:flex-row justify-between">
        <figure className="relative h-96 w-full p-1">
          <img
            className="h-full w-full m-auto object-center object-cover rounded-lg shadow-xl shadow-teal-900/50"
            src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
            alt="nature image"
          />
          <figcaption className="absolute bottom-8 left-2/4 flex w-4/5 -translate-x-2/4 justify-between rounded-xl border border-teal-800 bg-teal-200 bg-opacity-70 py-4 px-6 ">
            <div className="">
              <Typography className="text-lg lg:text-2xl font-bold text-teal-700">
                Sara Lamalo
              </Typography>
              <Typography
                color="gray"
                className="mt-2 font-normal text-sm text-teal-950"
              >
                20 July 2022
              </Typography>
            </div>
          </figcaption>
        </figure>
        <figure className="relative h-96 w-full p-1">
          <img
            className="h-full w-full m-auto object-center object-cover rounded-lg shadow-xl shadow-teal-900/50"
            src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
            alt="nature image"
          />
          <figcaption className="absolute bottom-8 left-2/4 flex w-4/5 -translate-x-2/4 justify-between rounded-xl border border-teal-800 bg-teal-200 bg-opacity-70 py-4 px-6 ">
            <div>
              <Typography className="text-lg lg:text-2xl font-bold text-teal-700">
                Sara Lamalo
              </Typography>
              <Typography
                color="gray"
                className="mt-2 font-normal text-sm text-teal-950"
              >
                20 July 2022
              </Typography>
            </div>
          </figcaption>
        </figure>
        <figure className="relative h-96 w-full p-1">
          <img
            className="h-full w-full m-auto object-center object-cover rounded-lg shadow-xl shadow-teal-900/50"
            src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
            alt="nature image"
          />
          <figcaption className="absolute bottom-8 left-2/4 flex w-4/5 -translate-x-2/4 justify-between rounded-xl border border-teal-800 bg-teal-200 bg-opacity-70 py-4 px-6 ">
            <div>
              <Typography className="text-lg lg:text-2xl font-bold text-teal-700">
                Sara Lamalo
              </Typography>
              <Typography
                color="gray"
                className="mt-2 font-normal text-sm text-teal-950"
              >
                20 July 2022
              </Typography>
            </div>
          </figcaption>
        </figure>
      </section>
      {/* Welcome Section */}
      <section className="m-5 py-4 bg-teal-400 rounded-md flex flex-col items-center">
        <h2 className="pb-4 text-2xl md:text-4xl font-bold  text-teal-800">
          Welcome to our Website
        </h2>
        <div className="md:px-3 lg:px-6 xl:px-10 flex flex-col md:flex-row items-center justify-center ">
          {/* Image Section */}
          <img
            className="w-[80%]  md:w-1/4  opacity-80 object-center object-cover rounded-lg shadow-2xl shadow-teal-950/50"
            src="https://images.unsplash.com/photo-1595206133361-b1fe343e5e23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
            alt="Welcome Image"
          />
          {/* Content Section */}
          <div className="md:ps-3 lg:ps-6 xl:ps-10 w-[80%] md:w-3/4  flex flex-col items-center justify-around   ">
            <p className="py-4 text-xs lg:text-sm xl:text-base 2xl:text-lg font-semibold  text-teal-100 ">
              We, Zen Max Industries, are a reputable producer and supplier of
              top-notch Detergent Powder, Liquid Dish Wash, Liquid Detergent,
              and many more products. We were established in 2020 in Dhule,
              Maharashtra. These items are meticulously prepared using
              better-grade chemical compounds, basic components, and technology.
              The supplied range is meticulously processed at our
              state-of-the-art production facility following the established
              global quality standards. Due to its qualities like longer shelf
              life, high purity, efficacy, and accurate formulation, our goods
              have received a lot of praise from consumers all over the market.
              In addition, our products are offered various packaging options
              and other associated conditions to meet the various demands of our
              cherished clients.
            </p>
          </div>
        </div>
        <button className="mt-2 text-sm px-2 py-1 lg:px-3 lg:py-2 md:font-semibold bg-teal-100 text-teal-900   hover:text-teal-50 hover:bg-teal-700">
          Read More
        </button>
      </section>
      <PopularProduct />
    </>
  );
}

export default MainBody;

// lg:w-1/3 xl:w-1/4
// lg:w-2/3 xl:w-3/4
// w-72 h-56 md:w-96 md:h-80
// h-60 md:h-80

// style={{ height: "48vh" }}
