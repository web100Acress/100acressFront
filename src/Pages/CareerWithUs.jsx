import React, { useContext, useEffect, useMemo, useState } from "react";

import Footer from "../Components/Actual_Components/Footer";
import { MapPin, Mail, Phone } from "lucide-react";
import { CarrierIcon } from "../Assets/icons";
import { DataContext } from "../MyContext";
import api from "../config/apiClient";

const CareerWithUs = () => {
  
  const { jobPostingData } = useContext(DataContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [applyForId, setApplyForId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", resumeUrl: "", coverLetter: "" });
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/career/opening/ViewAll");
        const arr = res?.data?.data || [];
        setJobs(Array.isArray(arr) ? arr : []);
      } catch (e) {
        console.error(e);
        setError("Failed to load openings");
        setJobs([]);
      }
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const calculateDaysAgo = (postedDate) => {
    const currentDate = new Date();
    const postedOnDate = new Date(postedDate);
    const differenceInTime = currentDate - postedOnDate;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays === 0 ? "Today" : `${differenceInDays} Day${differenceInDays > 1 ? 's' : ''} ago`;
  };

  const submitApplication = async (e) => {
    e.preventDefault();
    if (!applyForId) return;
    try {
      if (resumeFile) {
        const fd = new FormData();
        fd.append('name', form.name);
        fd.append('email', form.email);
        if (form.phone) fd.append('phone', form.phone);
        if (form.coverLetter) fd.append('coverLetter', form.coverLetter);
        if (form.resumeUrl) fd.append('resumeUrl', form.resumeUrl); // optional fallback link
        fd.append('resume', resumeFile);
        await api.post(`/career/opening/${applyForId}/apply`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post(`/career/opening/${applyForId}/apply`, form);
      }
      alert("Application submitted.");
      setApplyForId(null);
      setForm({ name: "", email: "", phone: "", resumeUrl: "", coverLetter: "" });
      setResumeFile(null);
    } catch (err) {
      console.error(err);
      alert("Failed to submit application.");
    }
  };

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
        <section className="my-2">
          {loading && <p>Loading openings...</p>}
          {error && <p className="text-red-600">{error}</p>}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {jobs.map((job, index) => (
              <div key={(job._id || index) + (job.jobTitle || "")} className="bg-white p-4 shadow-lg rounded-3xl">
                <h5 className="font-bold">{job.jobTitle}</h5>
                <p className="flex"><MapPin color="#C13B44" size={20} strokeWidth={1.5} className="mr-2"/>{job.jobLocation || job.location || "Gurgaon, Haryana"}</p>
                <h6>Experience : <span className="font-bold">{job.experience || "N/A"}</span></h6>
                {job.skill && <h6>Skills : <span className="font-bold">{job.skill}</span></h6>}
                <p className="font-extralight text-gray-500">{calculateDaysAgo(job.createdAt || new Date().toISOString())}</p>
                <button onClick={() => setApplyForId(job._id)} className="ml-auto mt-2 px-4 py-2 bg-primaryRed hover:bg-red-700 text-white rounded">Apply Now</button>
              </div>
            ))}
          </div>
        </section>
        {applyForId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl w-11/12 max-w-lg">
              <h3 className="text-xl font-semibold mb-4">Apply for this job</h3>
              <form onSubmit={submitApplication} className="space-y-3">
                <input className="w-full border p-2 rounded" placeholder="Full name" value={form.name} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))} required />
                <input type="email" className="w-full border p-2 rounded" placeholder="Email" value={form.email} onChange={(e)=>setForm(f=>({...f,email:e.target.value}))} required />
                <input className="w-full border p-2 rounded" placeholder="Phone" value={form.phone} onChange={(e)=>setForm(f=>({...f,phone:e.target.value}))} />
                <input className="w-full border p-2 rounded" placeholder="Resume URL (Drive/Link)" value={form.resumeUrl} onChange={(e)=>setForm(f=>({...f,resumeUrl:e.target.value}))} />
                <div>
                  <label className="block text-sm mb-1">Upload resume (PDF/DOC, optional)</label>
                  <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={(e)=> setResumeFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
                </div>
                <textarea className="w-full border p-2 rounded" placeholder="Cover letter" rows={4} value={form.coverLetter} onChange={(e)=>setForm(f=>({...f,coverLetter:e.target.value}))} />
                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={()=> setApplyForId(null)} className="px-4 py-2 rounded border">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded bg-primaryRed text-white">Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}
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