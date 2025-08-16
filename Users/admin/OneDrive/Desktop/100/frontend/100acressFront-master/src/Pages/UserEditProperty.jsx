import React,{useState} from "react";

const UserEditProperty = () => {
  const propertyTypes = ["Select Property Type", "Commercial", "Residential"];

  const [sellProperty, setSellProperty] = useState({
    propertyLooking: "",
    selectoption: "Select Property Type",
  });

  const subTypes = {
    Commercial: [
      "Office",
      "Retail",
      "Industrial",
      "Plot / Land",
      "Storage",
      "Hospitality",
      "Other",
    ],
    Residential: [
      "Flat/Apartment",
      "Independent House / Villa",
      "Independent / Builder Floor",
      "1 RK/ Studio Apartment",
      "Serviced Apartment",
      "Farmhouse",
      "Other",
    ],
    // Add more subtypes as needed
  };

  const handleSelectChange = (e) => {
    setSellProperty({
      ...sellProperty,
      selectoption: e.target.value,
    });
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;

    if (name === "selectoption") {
      setSellProperty({
        ...sellProperty,
        [name]: value,
        propertyType: "",
        subType: "",
      });
    } else if (name === "propertyType") {
      setSellProperty({
        ...sellProperty,
        [name]: value,
        subType: "", // Reset subType when propertyType changes
      });
    } else {
      setSellProperty({
        ...sellProperty,
        [name]: value,
      });
    }
  };
  return (
    <div>
      <section className=" py-12 text-gray-800 ">
        <div className="mx-auto flex max-w-md flex-col rounded-lg lg:max-w-screen-xl lg:flex-row">
          <div className="max-w-xl px-4 lg:pr-24 lg:pt-20">
            <h3 className="lg:text-5xl md:text-3xl  font-semibold">
              Post your property
            </h3>
            <h3 className=" mb-3 lg:text-5xl md:text-3xl font-semibold text-red-400 ">
              get the best prices
            </h3>
            <p className="mb-3 text-lg text-gray-600 text-justify lg:w-3/4 hidden md:block">
              100acress is the best place to sell your property, we are
              dedicated to providing advisory and mediation services for all
              your needs. you can expect us every time. All that is for you!
            </p>
            <div className="flex flex-col space-x-2 sm:flex-row space-y-4 sm:space-y-0 ml-[-10px] lg:pt-12">
              <button className="rounded-full text-white text-md sm:text-lg md:text-md font-normal px-3 sm:px-6 py-2 sm:py-4 bg-red-400 hover:bg-red-500">
                Get started
              </button>
              <button className="rounded-full text-md sm:text-lg md:text-md font-normal text-white px-3 sm:px-6 py-2 sm:py-4 bg-gray-400 hover:bg-gray-500">
                How It Works
              </button>
            </div>
          </div>

          <div className="mt-8 mb-8 max-w-3/4  shadow-2xl sm:rounded-lg sm:shadow-lg lg:mt-0  bg-red-400 px-1">
            <div className="m-2">
              <p className="text-2xl mx-2 text-white">
                Edit Property<span>....</span>
              </p>

              <p>
                <span
                  className={`mx-2 px-3 py-1 rounded-2xl text-white border-2 hover:bg-red-600 hover:text-white ${
                    sellProperty.propertyLooking === "Sell"
                      ? "bg-red-600 text-white"
                      : ""
                  }`}
                  
                >
                  Sell
                </span>{" "}
                <span
                  className={`px-3 text-white py-1 rounded-2xl border-2 hover:bg-red-600 hover:text-white ${
                    sellProperty.propertyLooking === "rent"
                      ? "bg-red-600 text-white"
                      : ""
                  }`}
                  
                >
                  Rent/Lease
                </span>{" "}
              </p>


            </div>

            <div className="p-1 sm:p-8">
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <select
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none text-gray-500"
                    name="selectoption"
                    value={sellProperty.selectoption}
                    onChange={handleChangeValue}
                  >
                    {propertyTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {sellProperty.selectoption !== "Select Property Type" && (
                  <select
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none text-gray-500"
                    name="propertyType"
                    value={sellProperty.propertyType}
                    onChange={handleChangeValue}
                  >
                    {subTypes[sellProperty.selectoption].map(
                      (subType, index) => (
                        <option key={index} value={subType}>
                          {subType}
                        </option>
                      )
                    )}
                  </select>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Property Name"
                  name="propertyName"
                  className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                />
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <input
                    type="text"
                    placeholder="Price"
                    name="price"
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Area"
                    name="area"
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                />
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <input
                    type="text"
                    placeholder="Landmark"
                    name="landmark"
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Amenities"
                    multiple
                    name="amenities"
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <input
                    type="text"
                    placeholder="Built year"
                    name="builtyear"
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Furnishing"
                    name="furnishing"
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <input
                    type="text"
                    placeholder="Type"
                    name="type"
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Available date"
                    name="availabledate"
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 text-gray-500">
                <div>
                  <label htmlFor="frontImage" className=" text-white mx-3 ">
                    Upload Front Images:
                  </label>
                  <input
                    type="file"
                    name="frontImage"
                    accept="image/*"
                    className="mt-2 h-10 w-full rounded-md bg-white border text-gray-500 px-3 outline-none pt-1"
                  />
                </div>

                <div>
                  <label htmlFor="otherImage" className=" text-white mx-3 ">
                    Upload Other Images:
                  </label>
                  <input
                    type="file"
                    multiple
                    name="otherImage"
                    accept="image/*"
                    id="otherImage"
                    className="mt-2 h-10 w-full rounded-md bg-white border text-gray-500 px-3 outline-none pt-1 mb-3"
                  />
                </div>
              </div>
              
              <div className="flex justify-center items-center">
                <button className="rounded-lg text-white text-md sm:text-lg md:text-md border-2 font-normal px-2 sm:px-6 py-1 sm:py-4 bg-red-400 hover:bg-red-500">
                  Submit
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserEditProperty;
