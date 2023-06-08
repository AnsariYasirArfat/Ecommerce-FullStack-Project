const ContactUs = () => {
  return (
    <div className="bg-teal-100 py-8">
      <div className=" m-5 flex flex-col md:flex-row">
        <div className="text-teal-200  bg-teal-700 p-8  md:w-1/2 flex flex-col justify-around">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-teal-50 ">
            ZEN MAX INDUSTRIES
          </h1>
          <div className=" hover:text-teal-50 hover:bg-teal-900 p-2 hover:rounded-md hover:shadow-xl hover:shadow-teal-400">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold mb-1">
              Contact Person
            </h2>
            <p className=" text-xs sm:text-sm lg:text-base">Mr. Aamir</p>
          </div>
          <div className=" hover:text-teal-50 hover:bg-teal-900 p-2 hover:rounded-md hover:shadow-xl hover:shadow-teal-400">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold mb-1">
              Address
            </h2>
            <p className=" text-xs sm:text-sm lg:text-base">
              Plot No. 103, Muslim Nagar, Near Munshi Masjid, <br /> Dhule,
              Maharashtra, India - 424001
            </p>
          </div>
          <div className=" hover:text-teal-50 hover:bg-teal-900 p-2 hover:rounded-md hover:shadow-xl hover:shadow-teal-400">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold mb-1">
              Call Us
            </h2>
            <p className=" text-xs sm:text-sm lg:text-base">
              +91-7276492239, +91-9421080313
            </p>
          </div>
          <div className=" hover:text-teal-50 hover:bg-teal-900 p-2 hover:rounded-md hover:shadow-xl hover:shadow-teal-400">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold mb-1">
              Email
            </h2>
            <p className=" text-xs sm:text-sm lg:text-base">
              zenmax20820@gmail.com
            </p>
          </div>
          <div className=" hover:text-teal-50 hover:bg-teal-900 p-2 hover:rounded-md hover:shadow-xl hover:shadow-teal-400">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold mb-1">
              Web Address
            </h2>
            <p className=" text-xs sm:text-sm lg:text-base">
              http://www.zenmaxindustries.in
            </p>
          </div>
          <div className=" hover:text-teal-50 hover:bg-teal-900 p-2 hover:rounded-md hover:shadow-xl hover:shadow-teal-400">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold mb-1">
              Web Page
            </h2>
            <p className="text-sm sm:text-sm lg:text-base">
              https://www.exportersindia.com/zen-max-industries/
            </p>
          </div>
        </div>
        <div className="text-teal-700  bg-teal-200 p-8 md:w-1/2 flex flex-col justify-around">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 text-teal-900 ">
            Enquiry Form
          </h1>
          <form>
            <div className="mb-2">
              <label
                className="block font-bold mb-2 text-sm sm:text-base lg:text-lg "
                htmlFor="name"
              >
                Your Name
              </label>
              <input
                className="text-xs sm:text-sm lg:text-base w-full px-4 py-2 border rounded-md focus:outline-none focus:border-teal-900 bg-teal-50"
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-2">
              <label
                className="block font-bold mb-2 text-sm sm:text-base lg:text-lg "
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="text-xs sm:text-sm lg:text-base w-full px-4 py-2 border rounded-md focus:outline-none focus:border-teal-900 bg-teal-50"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-2">
              <label
                className="block font-bold mb-2 text-sm sm:text-base lg:text-lg "
                htmlFor="country"
              >
                Select Country
              </label>
              <select
                className="text-xs sm:text-sm lg:text-base w-full px-4 py-2 border rounded-md focus:outline-none focus:border-teal-900 bg-teal-50"
                id="country"
                name="country"
              >
                <option value="india">India</option>
              </select>
            </div>
            <div className="mb-2">
              <label
                className="block font-bold mb-2 text-sm sm:text-base lg:text-lg "
                htmlFor="state"
              >
                Select State
              </label>
              <select
                className="text-xs sm:text-sm lg:text-base w-full px-4 py-2 border rounded-md focus:outline-none focus:border-teal-900 bg-teal-50"
                id="state"
                name="state"
              >
                <option value="">Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Andaman and Nicobar Islands">
                  Andaman & Nicobar Islands
                </option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Dadra and Nagar Haveli">
                  Dadra & Nagar Haveli
                </option>
                <option value="Daman and Diu">Daman & Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
              </select>
            </div>
            <div className="mb-2">
              <label
                className="block font-bold mb-2 text-sm sm:text-base lg:text-lg "
                htmlFor="city"
              >
                City
              </label>
              <input
                className="text-xs sm:text-sm lg:text-base w-full px-4 py-2 border rounded-md focus:outline-none focus:border-teal-900 bg-teal-50"
                type="text"
                id="city"
                name="city"
                placeholder="City"
              />
            </div>
            <div className="mb-2">
              <label
                className="block font-bold mb-2 text-sm sm:text-base lg:text-lg "
                htmlFor="phone"
              >
                Phone / Mobile
              </label>
              <div>
                <input
                  className="text-xs sm:text-sm lg:text-base  w-full px-4 py-2 border rounded-md focus:outline-none focus:border-teal-900 bg-teal-50"
                  type="tel"
                  id="phone-number"
                  name="phone-number"
                  placeholder="Phone / Mobile"
                />
              </div>
            </div>
            <div className="mb-2">
              <label
                className="block font-bold mb-2 text-sm sm:text-base lg:text-lg "
                htmlFor="enquiry"
              >
                Enquiry Details
              </label>
              <textarea
                className="text-xs sm:text-sm lg:text-base w-full px-4 py-2 border rounded-md h-32 resize-none focus:outline-none focus:border-teal-900 bg-teal-50 scroll"
                id="enquiry"
                name="enquiry"
                placeholder="Your Requirement"
              ></textarea>
            </div>
            <div className="w-full">
              <button
                className="bg-teal-500 text-teal-50 text-xs sm:text-sm lg:text-base py-1 px-2  md:px-3 lg:px-4 rounded-md hover:bg-teal-600 me-4"
                type="submit"
              >
                Submit
              </button>
              <button
                className="bg-teal-500 text-teal-50 text-xs sm:text-sm lg:text-base py-1 px-2  md:px-3  lg:px-4 rounded-md hover:bg-teal-600 hover:text-red-400"
                type="reset"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
