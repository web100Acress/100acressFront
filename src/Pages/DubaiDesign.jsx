import React from "react";
import Slider from "react-slick";

const DubaiDesign = () => {
  function getRandomSpeed(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    autoplaySpeed: getRandomSpeed(2000, 5000), // Random speed between 2000ms and 5000ms
    arrows: false,
  };

  var settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    autoplaySpeed: getRandomSpeed(2000, 5000), // Random speed between 2000ms and 5000ms
    arrows: false,
  };

  var settings3 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    autoplaySpeed: getRandomSpeed(2000, 5000), // Random speed between 2000ms and 5000ms
    arrows: false,
  };

  return (
    <div className="bg-[#083819]  mx-6 lg:mx-6 xl:mx-14 mb-3 md:mx-6 rounded-md overflow-hidden relative">
      <div className="w-full flex flex-col md:flex-row">
        <div className="md:w-[898px] w-full p-8">
          <div className="text-white text-2xl font-semibold">
            <strong>
              Discover Exclusive Property Opportunities in Dubai{" "}
              <span className="bg-[#36DEA4] px-1 rounded-md py-1 text-lg font-normal text-gray-500 mx-2">
                New
              </span>
            </strong>
          </div>

          <div className="text-white text-center pt-4 md:w-96 w-full">
            <span>
              Considering investing in Dubai? Stay ahead with the latest
              property trends and insights. Get a comprehensive report on
              exclusive opportunities and market analysis here.
            </span>
          </div>

          <div className="pt-4  flex justify-center sm:justify-center lg:justify-start lg:ml-24">
            <button className=" hover:bg-white rounded-full px-4 py-2 text-center text-lg bg-[#36DEA4] text-gray-500 w-full md:w-48">
              Explore Now
            </button>
          </div>
        </div>

        <div className="md:w-[550px] w-full  relative  flex flex-col md:flex-row hidden md:flex">
          <div className="w-[187px] relative -mr-12">
            <Slider {...settings}>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="object-cover m-2">
                  <img
                    src={`../../../Images/D${num}.webp`}
                    alt={`Image ${num}`}
                    className="w-[120px] h-[90px] rounded-sm"
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="w-[187px] relative -mr-12  -top-4">
            <Slider {...settings2}>
              {[1, 4, 3, 2, 5, 6].map((num) => (
                <div key={num} className="object-cover m-2">
                  <img
                    src={`../../../Images/D${num}.webp`}
                    alt={`Image ${num}`}
                    className="w-[120px] h-[90px] rounded-sm"
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="w-[187px] relative -mr-6  ">
            <Slider {...settings3}>
              {[6, 2, 3, 1, 5, 4].map((num) => (
                <div key={num} className="object-cover m-2 ">
                  <img
                    src={`../../../Images/D${num}.webp`}
                    alt={`Image ${num}`}
                    className="w-[120px] h-[90px] rounded-sm"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DubaiDesign;
