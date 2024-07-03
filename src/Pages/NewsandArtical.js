import React from "react";
import Footer from "../Components/Actual_Components/Footer";
import Nav from "../aadharhomes/Nav";
import { Helmet } from "react-helmet";
const NewsandArtical = () => {
  return (
    <>
      <Nav />
      
      <Helmet>
        <meta
          name="description"
          content="Stay updated with the latest news and informative articles related to real estate on 100acress.com. Explore trends and tips for property buyers and sellers."
        />
        <title>
        Latest News and Articles in Real Estate at 100acress.com
        </title>
        <link rel="canonical" href="https://www.100acress.com/newsandarticals/" />
      </Helmet>

      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <h1 className="sm:text-4xl text-5xl mb-4 underline text-red-600  font-bold title-font ">
          100acress.com Latest News.
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-5">
          <div
            className="relative w-full flex items-end justify-start text-left bg-cover bg-center"
            style={{
              height: 450,
              backgroundImage:
                "url(https://etimg.etb2bimg.com/photo/107572911.cms)",
            }}
          >
            <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
            <div className="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-between items-center">
              <a
                href="#"
                className="text-xs bg-red-600 text-white px-5 py-2 uppercase hover:bg-white hover:text-red-600 transition ease-in-out duration-500"
              >
                Real Estate
              </a>
              <div className="text-white font-regular flex flex-col justify-start">
                <span className="text-3xl leading-0 font-semibold">25</span>
                <span className="-mt-3">May</span>
              </div>
            </div>
            <main className="p-5 z-10">
              <a
                href="https://realty.economictimes.indiatimes.com/news/residential/gurugram-project-held-up-mahira-homes-buyers-seek-temporary-accommodation-or-rent/107612991?utm_source=top_news&utm_medium=tagListing"
                className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline"
              >
                Gurugram: Project held up, Mahira Homes' buyers seek temporary
                accommodation or ..
              </a>
            </main>
          </div>
          <div
            className="relative w-full flex items-end justify-start text-left bg-cover bg-center"
            style={{
              height: 450,
              backgroundImage:
                "url(https://etimg.etb2bimg.com/photo/107613092.cms)",
            }}
          >
            <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
            <div className="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-between items-center">
              <a
                href="#"
                className="text-xs bg-red-600 text-white px-5 py-2 uppercase hover:bg-white hover:text-red-600 transition ease-in-out duration-500"
              >
                Real Estate
              </a>
              <div className="text-white font-regular flex flex-col justify-start">
                <span className="text-3xl leading-0 font-semibold">10</span>
                <span className="-mt-3">Mar</span>
              </div>
            </div>
            <main className="p-5 z-10">
              <a
                href="https://realty.economictimes.indiatimes.com/news/infrastructure/gurugram-civic-body-to-survey-294-unauthorised-colonies-before-regularisation/107572885?utm_source=top_news&utm_medium=tagListing"
                className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline"
              >
                Gurugram civic body to survey 294 unauthorised colonies before
                regularisation
              </a>
            </main>
          </div>
          <div
            className="relative w-full flex items-end justify-start text-left bg-cover bg-center"
            style={{
              height: 450,
              backgroundImage:
                "url(https://etimg.etb2bimg.com/photo/107413537.cms)",
            }}
          >
            <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
            <div className="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-between items-center">
              <a
                href="#"
                className="text-xs bg-red-600 text-white px-5 py-2 uppercase hover:bg-white hover:text-red-600 transition ease-in-out duration-500"
              >
                Real Estate
              </a>
              <div className="text-white font-regular flex flex-col justify-start">
                <span className="text-3xl leading-0 font-semibold">20</span>
                <span className="-mt-3">Jan</span>
              </div>
            </div>
            <main className="p-5 z-10">
              <a
                href="#"
                className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline"
              >
                Middle East Participants Gather In Warsaw
              </a>
            </main>
          </div>
          <div
            className="relative w-full flex items-end justify-start text-left bg-cover bg-center"
            style={{
              height: 450,
              backgroundImage:
                "url(https://etimg.etb2bimg.com/photo/107131039.cms)",
            }}
          >
            <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
            <div className="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-between items-center">
              <a
                href="#"
                className="text-xs bg-red-600 text-white px-5 py-2 uppercase hover:bg-white hover:text-red-600 transition ease-in-out duration-500"
              >
                Real Estate
              </a>
              <div className="text-white font-regular flex flex-col justify-start">
                <span className="text-3xl leading-0 font-semibold">25</span>
                <span className="-mt-3">May</span>
              </div>
            </div>
            <main className="p-5 z-10">
              <a
                href="https://realty.economictimes.indiatimes.com/news/infrastructure/dtcp-ramps-up-checks-demolishes-12-houses-in-colony-off-golf-course-road/107131009?utm_source=top_news&utm_medium=tagListing"
                className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline"
              >
                DTCP ramps up checks, demolishes 12 houses in colony off Golf
                Course Road
              </a>
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default NewsandArtical;
