import React, { useContext} from "react";

import Footer from "../Components/Actual_Components/Footer";
import { MapPin, Mail, Phone } from "lucide-react";
import { CarrierIcon } from "../Assets/icons";
import { DataContext } from "../MyContext";

const availableJobs = [
  {
    id: 1,
    jobTitle: "SEO Executive",
    jobType: "Full Time",
    experience: "1+ years",
    location: "Gurgaon, Haryana",
    postedOn: "1 Day ago",
  },
  {
    id: 2,
    jobTitle: "Sales Manager",
    jobType: "Full Time",
    experience: "2+ years",
    location: "Gurgaon, Haryana",
    postedOn: "1 Day ago",
  },
  {
    id: 3,
    jobTitle: "Sales Executive",
    jobType: "Full Time",
    experience: "0 to 1 year",
    location: "Gurgaon, Haryana",
    postedOn: "1 Day ago",
  },
]

const CareerWithUs = () => {
  
  const {jobPostingData} = useContext(DataContext);
  console.log(jobPostingData,"jobPostingData")

 
  return (
    <div style={{overflowX:"hidden"}}>
      <div className="overflow-x-hidden">
       <div className="block w-10/12 mx-auto mt-20">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:basis-1/2">
            <h1 className="text-primaryRed my-4" style={{fontFamily:"'Gluten', serif"}}>Shape your future with us</h1>
            <p className="text-primaryRed my-4">Join a team that values growth and innovation. Discover opportunities to make an impact and build a fulfilling career with us.</p>
            <a className="hover:text-white my-4" href="#openings"><button className="px-4 py-1 bg-primaryRed hover:bg-red-700 text-white rounded">View Openings</button></a>
          </div>
          <div className="lg:basis-1/2 flex justify-end align-center">
            <CarrierIcon className="w-full lg:w-3/4"/>
            {/* <img className="w-full lg:w-3/4" src="/Images/Job offers-pana 1.svg" alt="career" /> */}
          </div>
        </div>  
        <section className="mt-16">
          <h2 className="">We are commited</h2>
          <p className="text-md">We aim to provide exceptional service, and user-friendly tools to get the desired results for our customers. We always look for ambitious, hard-working, and smart talented people for our company. If you have the zeal to achieve great milestones in your career, come join us!</p>
          <h2 id="openings" className="">Open Positions</h2>
          <div className="hidden">
            <input className="py-3 px-9 w-96 border-2 border-r-0 rounded-s-full" name="" id="" placeholder="Role eg: Graphic Designer"/>
            <input className="py-3 px-9 w-96 border-2 rounded-e-full" name="" id="" placeholder="Location"/>
          </div>
        </section>
        <section className="my-2 grid grid-cols-1 lg:grid-cols-4 gap-4">
            {availableJobs.map((job,index)=>(
                       <div key={index+job.id+job.jobTitle} className="bg-white p-4 shadow-lg rounded-3xl">
                       {/* <p className="font-light">Marketing</p> */}
                       <h5 className="font-bold">{job.jobTitle}</h5>
                       <p className="flex"><MapPin color="#C13B44" size={20} strokeWidth={1.5} className="mr-2"/>{job.location}</p>
                       <h6>Job Type: <span className="font-bold">{job.jobType}</span></h6>
                       <h6>Experience : <span className="font-bold">{job.experience}</span></h6>
                       <p className="font-extralight text-gray-500">{job.postedOn}</p>
                       <a href="mailto:hr@100acress.com"><button className="ml-auto mt-2 px-4 py-2 bg-primaryRed hover:bg-red-700 text-white rounded">Apply Now</button></a>
                   </div>
            ))}
        </section>
        <div className="my-4 border-2 bg-white p-4 shadow-lg rounded-3xl">
            <p className="">If you looking for an opening check our current openings or write to us at:</p>
            <div className="flex mb-3"><Mail color="#C13B44" size={20} strokeWidth={1.5} className="mr-4"/><a href="mailto:hr@100acress.com" className="text-primaryRed font-medium hover:text-primaryRed">hr@100acress.com</a></div>
            <div className="flex mt-3"><Phone color="#C13B44" size={20} strokeWidth={1.5} className="mr-4"/><a href="tel:+918500900100" className="text-primaryRed font-medium hover:text-primaryRed">+91-8500900100</a></div>
        </div>
       </div>
      </div>
      <Footer/>
    </div>
  );
};
export default CareerWithUs;