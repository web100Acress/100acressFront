import React from 'react';
import { MdEmail } from 'react-icons/md';
import { LuPhoneCall } from 'react-icons/lu';
import { FaLocationDot } from 'react-icons/fa6';
import { FaShareAlt } from 'react-icons/fa';
import { BsFacebook } from 'react-icons/bs';
import { GrInstagram } from 'react-icons/gr';
import { FaXTwitter } from 'react-icons/fa6';
import { FaLinkedin } from "react-icons/fa";

const ContactPage = () => {
  return (
    <>
      <div className='w-full bg-cover relative' style={{
        backgroundImage:
          "url('https://www.dp.ae/videos/img/a9c3fbd0-0883-43b4-a627-1fa0252286fdoverview-img.jpg?metadata=true&quality=65')",
        height: "80%",
      }}>
        <div className='flex text-white text-center absolute inset-0 justify-center items-center'>
          <div className='max-w-3xl mx-auto px-4'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl leading-tight'>
              Lorem ipsum dolor sit amet consectetur <br className='md:hidden lg:inline' /> adipisicing elit. Animi, doloribus!
            </h1>
            <div className='mt-6 md:mt-8'>
              <button className="rounded-xl px-6 py-2 text-base md:text-lg lg:text-xl font-bold text-white border-2" type="submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="container-grid w-full py-8 bg-red-600  " >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mr-20 ml-20">
          <div className="bg-white text-danger rounded-lg p-4 flex flex-col items-center ">
            <MdEmail size={35} className="mb-3" />
            <strong className="text-xl">Email</strong>
            <p className="text-sm mt-2 ">info@aadharhomes.com <br />
              jquery@aadharhomes.com</p>

          </div>

          <div className=" bg-white text-danger rounded-lg p-4 flex flex-col items-center">
            <LuPhoneCall size={35} className="mb-3" />
            <strong className="text-xl">Call Us</strong>
            <p className="text-sm mt-3">Landline - (0) 124 435494<br />
              Mobile - (0) 9811 750 130</p>
          </div>

          <div className=" bg-white text-danger rounded-lg p-4 flex flex-col items-center">
            <FaLocationDot size={35} className="mb-3" />
            <strong className="text-xl">Visit Us</strong>
            <p className="text-sm mt-3">
              708, ILD Trade Center <br />
              Sohna Road, Gurgaon
            </p>
          </div>

          <div className=" bg-white text-danger rounded-lg p-4 flex flex-col items-center">
            <FaShareAlt size={35} className="mb-3" />
            <strong className="text-xl">Connect With Us</strong>
            <ul className="social-icons flex" >
              <li className="mr-3 mt-4">
                <BsFacebook size={20} />
              </li>
              <li className="mr-3 mt-4" >
                <GrInstagram size={20} />
              </li>
              <li className="mr-3 mt-4" >
                <FaXTwitter size={20} />
              </li>
              <li className="mr-3 mt-4">
                <FaLinkedin size={20} />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/*   contact form  */}
      <div div className="font-sans text-base text-gray-900 sm:px-10" >
        <div className="text-base text-center text-gray-900">
          <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
            <div className="mx-2 pt-12 md:mx-auto md:w-2/3 md:pb-12">
              <div className="text-lg sm:text-xl xl:text-xl">
              </div>
            </div>
          </div>
        </div>
        <div>

          <h1 className='text-3xl md:text-4xl lg:text-5xl text-center mb-3 mt-[-40] leading-tight'>
            Enquiry Now
          </h1>
        </div>
        <div>
          <div className="mx-auto mb-20 flex bg-gray-100 w-full max-w-screen-lg flex-col overflow-hidden rounded-xl text-gray-900 md:flex-row md:border">
            <form className="mx-auto w-full max-w-xl border-gray-200 px-10 py-8 md:px-8 ">
              <div className="mb-4">
      <label className="text mb-2 block font-medium" htmlFor="name">
        Name*
      </label>
      <input
        className="w-full border-b border-red-600 px-3 py-2 outline-none ring-black  "
        id="name"
        type="name"
        placeholder="Enter your name"
        required
      />
    </div>
    <div className="mb-4">
      <label className="text mb-2 block font-medium" htmlFor="email">
        Email*
      </label>
      <input
        className="w-full border-b border-red-600 px-3 py-2 outline-none ring-red-600 "
        id="email"
        type="email"
        placeholder="Enter your email"
        required
      />
    </div>
    <div className="mb-4">
      <label className="text mb-2 block font-medium" htmlFor="mobile number">
        Mobile Number*
      </label>
      <input
        className="w-full border-b border-red-600 px-3 py-2 outline-none ring-black "
        id="mobile number"
        type="mobile number"
        placeholder="Enter your number"
        required
      />
    </div>
    <div className="mb-4">
      <label className="text mb-2 block font-medium" htmlFor="message">
        Query
      </label>
      <textarea
        className="h-40 w-full border-b border-red-600 px-3 py-2 outline-none ring-black "
        id="message"
        placeholder="Enter your query"
        required
      />
    </div>
              <div className='flex justify-center mt-6 md:mt-8'>
                <button className="rounded-xl px-8 py-2 text-base md:text-lg lg:text-xl font-bold text-white bg-red-600 border-2" type="submit">
                  Submit
                </button>
              </div>
            </form>

            <div className='w-full bg-cover ' style={{
              backgroundImage:
                "url('https://central67.dlf.in/media/images/contact-us/contact-us-img.webp')",
            }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;



