import React, { useContext , useEffect} from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { DataContext } from "../MyContext";
import { Link } from "react-router-dom";
const PossessionProperty = ({ deviceType }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 1, // optional, default to 1.
    },
    laptop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const { possessionDate, setPossessionDate } = useContext(DataContext);
  const handleDateClick = (value) => {
    setPossessionDate(value);
  };
  
  useEffect(() => {
    if (possessionDate) {
      try {
        localStorage.setItem('possessionDate', JSON.stringify(possessionDate));
      } catch (error) {
        console.error('Error storing data in localStorage:', error);
      }
    }
  }, [possessionDate]);
  

  return (
    <>
      <p className=" mb-0 text-xl text-white bg-[#00314F] lg:text-3xl md:text-2xl font-bold  sm:text-xl xs:text-xl text-left px-10 mt-4">
        Move in now, next year or later
        <br />
        <span className="text-sm font-medium">
          {" "}
          find projects that fit your preferred possession timeline.
        </span>
      </p>

      <div>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          deviceType={deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          <Link target="_top" to='/projects-in-gurugram/ready-to-move/property/'>
          <div className="bg-[#00314F] pt-2 pb-2 mb-[1.9rem] content"
           onClick={() => handleDateClick("Ready to move")}>
            <div className="mx-auto transition duration-300 hover:scale-105 flex flex-wrap justify-center max-w-screen-xl">
              <div className="relative bg-[#f7c089] mx-4 my-4 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 shadow-md">
                <a className="relative flex h-48 overflow-hidden ">
                  <img
                    className="object-cover w-full h-44"
                    src="../../Images/p1.jpg"
                    alt=" Ready to move"
                  />
                </a>
                <div className="mt-3 mb-6 px-3 pb-2">
                  <a>
                    <span className=" animate-bounce focus:animate-none hover:animate-none  inline-block text-2xl tracking-tight text-[#42526E] font-medium">
                      Ready to move
                    </span>
                    <span className="block text-gray-400">
                      320+ Properties
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          </Link>

          <Link    to='/projects-in-gurugram/possession'>
          <div
           
            onClick={() => handleDateClick(2024)}
            className="bg-[#00314F] pt-2 pb-2 mb-[1.9rem]"
          >
            <div  className=" transition duration-300 hover:scale-105 mx-auto flex flex-wrap justify-center max-w-screen-xl">
              <div className="relative bg-[#F0F9FF] mx-4 my-4 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100  shadow-md">
                <a className="relative flex h-48 overflow-hidden ">
                  <img
                    className="object-cover w-full  h-44"
                    src="../../Images/p2.jpg"
                    alt=" Ready to move"
                  />
                </a>
                <div className="mt-3 mb-6 px-3 pb-2">
                  <a>
                    <span className=" animate-bounce focus:animate-none hover:animate-none inline-block text-2xl tracking-tight text-[#42526E] font-medium">
                      Possession in <span>2024</span>
                    </span>
                    <span className="block text-gray-400">
                      600+ Properties
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          </Link>
          
          <Link  to="/projects-in-gurugram/possession">
            <div
             
              onClick={() => handleDateClick(2025)}
              className="bg-[#00314F] pt-2 pb-2 mb-[1.9rem]"
            >
              <div className=" transition duration-300 hover:scale-105 mx-auto flex flex-wrap justify-center max-w-screen-xl">
                <div className="relative bg-[#D7F2E3] mx-4 my-4 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100  shadow-md">
                  <a className="relative flex h-48 overflow-hidden ">
                    <img
                      className="object-cover w-full  h-44"
                      src="../../Images/p3.jpg"
                      alt=" Ready to move"
                    />
                  </a>
                  <div className="mt-3 mb-6 px-3 pb-2">
                    <a>
                      <span className=" animate-bounce focus:animate-none hover:animate-none inline-block text-2xl tracking-tight text-[#42526E] font-medium">
                        Possession in <span>2025</span>
                      </span>
                      <span className="block text-gray-400">
                        400+ Properties
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link   to="/projects-in-gurugram/possession">
            <div
             
              onClick={() => handleDateClick(2026)}
              className="bg-[#00314F] pt-2 pb-2 mb-[1.9rem]"
            >
              <div className=" transition duration-300 hover:scale-105 mx-auto flex flex-wrap justify-center max-w-screen-xl">
                <div className="relative bg-[#F0F9FF] mx-4 my-4 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100  shadow-md">
                  <a className="relative flex h-48 overflow-hidden ">
                    <img
                      className="object-cover w-full  h-44"
                      src="../../Images/p4.jpg"
                      alt=" Ready to move"
                    />
                  </a>
                  <div className="mt-3 mb-6 px-3 pb-2">
                    <a>
                      <span className=" animate-bounce focus:animate-none hover:animate-none inline-block text-2xl tracking-tight text-[#42526E] font-medium">
                        Possession in <span>2026</span>
                      </span>
                      <span className="block text-gray-400">
                        1000+ Properties
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link  to="/projects-in-gurugram/possession">
            <div
            
              onClick={() => handleDateClick(2027)}
              className="bg-[#00314F] pt-2 pb-2 mb-[1.9rem]"
              
            >
              <div className=" transition duration-300 hover:scale-105 mx-auto flex flex-wrap justify-center max-w-screen-xl">
                <div className="relative bg-[#F0F9FF] mx-4 my-4 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100  shadow-md">
                  <a className="relative flex h-48 overflow-hidden ">
                    <img
                      className="object-cover w-full  h-44"
                      src="../../Images/p3.jpg"
                      alt=" Ready to move"
                    />
                  </a>
                  <div className="mt-3 mb-6 px-3 pb-2">
                    <a>
                      <span className=" animate-bounce focus:animate-none hover:animate-none inline-block text-2xl tracking-tight text-[#42526E] font-medium">
                        Possession in <span>2027</span>
                      </span>
                      <span className="block text-gray-400">
                        800+ Properties
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link   to="/projects-in-gurugram/possession">
            <div
            
              onClick={() => handleDateClick(2028)}
              className="bg-[#00314F] pt-2 pb-2 mb-[1.9rem]"
             
            >
              <div className="transition duration-300 hover:scale-105 mx-auto flex flex-wrap justify-center max-w-screen-xl">
                <div className="relative bg-[#F0F9FF] mx-4 my-4 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100  shadow-md">
                  <a className="relative flex h-48 overflow-hidden ">
                    <img
                      className="object-cover w-full  h-44"
                      src="../../Images/p2.jpg"
                      alt=" Ready to move"
                    />
                  </a>
                  <div className="mt-3 mb-6 px-3 pb-2">
                    <a>
                      <span className=" animate-bounce focus:animate-none hover:animate-none inline-block text-2xl tracking-tight text-[#42526E] font-medium">
                        Possession in <span>2028</span>
                      </span>
                      <span className="block text-gray-400">
                        700+ Properties
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Link>

        </Carousel>
      </div>
    </>
  );
};

export default PossessionProperty;
