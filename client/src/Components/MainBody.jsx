import { Typography } from "@material-tailwind/react";

function MainBody() {
  return (
    <>
      {/* Banners' Section */}
      <div
        className="p-2 flex flex-col items-center md:flex-row "
        style={{ height: "48vh" }}
      >
        <figure className="relative h-full w-full p-2">
          <img
            className="h-full m-auto object-center object-cover rounded-lg shadow-xl shadow-teal-900/50"
            src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
            alt="nature image"
          />
          <figcaption className="absolute bottom-8 left-2/4 flex w-4/5 -translate-x-2/4 justify-between rounded-xl border border-teal-800 bg-teal-100 bg-opacity-70 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
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
        <figure className="relative h-full w-full p-2">
          <img
            className="h-full m-auto object-center object-cover rounded-lg shadow-xl shadow-teal-900/50"
            src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
            alt="nature image"
          />
          <figcaption className="absolute bottom-8 left-2/4 flex w-4/5 -translate-x-2/4 justify-between rounded-xl border border-teal-800 bg-teal-100 bg-opacity-70 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
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
        <figure className="relative h-full w-full p-2">
          <img
            className="h-full m-auto object-center object-cover rounded-lg shadow-xl shadow-teal-900/50"
            src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
            alt="nature image"
          />
          <figcaption className="absolute bottom-8 left-2/4 flex w-4/5 -translate-x-2/4 justify-between rounded-xl border border-teal-800 bg-teal-100 bg-opacity-70 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
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
      </div>
    </>
  );
}

export default MainBody;

// style={{ height: "48vh" }}
