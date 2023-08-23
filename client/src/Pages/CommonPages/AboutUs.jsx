import { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-teal-200 p-8">
      <div className="max-w-4xl mx-auto text-teal-900">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
          About Us
        </h1>
        <div className="text-xs sm:text-sm lg:text-base">
          <p className="mb-6">
            We, Zen Max Industries, are a reputable producer and supplier of
            top-notch Detergent Powder, Liquid Dish Wash, Liquid Detergent, and
            many more products.
          </p>
          <p className="mb-6">
            We were established in 2020 in Dhule, Maharashtra. These items are
            meticulously prepared using better-grade chemical compounds, basic
            components, and technology.
          </p>
          <p className="mb-6">
            The supplied range is meticulously processed at our state-of-the-art
            production facility following the established global quality
            standards. Due to its qualities like longer shelf life, high purity,
            efficacy, and accurate formulation, our goods have received a lot of
            praise from consumers all over the market. In addition, our products
            are offered various packaging options and other associated
            conditions to meet the various demands of our cherished clients.
          </p>
        </div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4">
          Our Team
        </h2>
        <div className="text-xs sm:text-sm lg:text-base">
          <p className="mb-6">
            Our company&apos;s strength is the group of sincere, diligent, and
            committed specialists we have on staff. Our staff members are highly
            knowledgeable and have years of expertise in their respective
            fields.
          </p>
          <p className="mb-6">
            The group of experts on our staff take great pride in understanding
            what our clients need from us and make every effort to provide the
            items in accordance. In addition, the items are processed by our
            qualified staff in strict accordance with the standards established
            by the industry.
          </p>
        </div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4">
          Why Us?
        </h2>
        <div className="text-xs sm:text-sm lg:text-base">
          <p className="mb-6">
            We are a reputable manufacturer and trader of top-notch goods. We
            can provide clients with the best selection of products thanks to
            our advanced infrastructure and skilled workforce.
          </p>
          <ul className="mb-6 list-disc pl-6">
            <li>Improved Capabilities</li>
            <li>Consistent Innovation</li>
            <li>Suitable Research Facilities</li>
          </ul>
          <table className="w-full mb-6">
            <tbody>
              <tr>
                <td className="border-2 border-teal-500 px-4 py-2 font-bold">
                  Nature of Business
                </td>
                <td className="border-2 border-teal-500 px-4 py-2">
                  Manufacturers, Wholesaler
                </td>
              </tr>
              <tr>
                <td className="border-2 border-teal-500 px-4 py-2 font-bold">
                  Number of Employees
                </td>
                <td className="border-2 border-teal-500 px-4 py-2">10</td>
              </tr>
              <tr>
                <td className="border-2 border-teal-500 px-4 py-2 font-bold">
                  Year of Establishment
                </td>
                <td className="border-2 border-teal-500 px-4 py-2">2020</td>
              </tr>
              <tr>
                <td className="border-2 border-teal-500 px-4 py-2 font-bold">
                  Market Covered
                </td>
                <td className="border-2 border-teal-500 px-4 py-2">India</td>
              </tr>
              <tr>
                <td className="border-2 border-teal-500 px-4 py-2 font-bold">
                  Name of CEO
                </td>
                <td className="border-2 border-teal-500 px-4 py-2">
                  Mr. Aamir
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
