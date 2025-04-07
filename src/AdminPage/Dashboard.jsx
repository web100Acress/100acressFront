// import React, { useEffect, useState } from "react";
// import Sidebar from "./Sidebar";
// import axios from "axios";
// import Chart from "./Chart";
// import { FiAlignJustify } from "react-icons/fi";
// import { TbDoorEnter } from "react-icons/tb";
// import { FaSellcast } from "react-icons/fa";
// import { GoProjectRoadmap } from "react-icons/go";
// import { HiOutlineUsers } from "react-icons/hi";
// import { GrProjects } from "react-icons/gr";
// import { SiOpenproject } from "react-icons/si";
// import {LineChart,Line, CartesianGrid,XAxis,YAxis,Tooltip,Legend} from "recharts";
// const data = [
//   { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
//   { name: "Page B", uv: 300, pv: 2400, amt: 2210 },
//   { name: "Page C", uv: 200, pv: 2400, amt: 2290 },
//   { name: "Page D", uv: 278, pv: 2400, amt: 2000 },
//   { name: "Page E", uv: 189, pv: 2400, amt: 2181 },
//   { name: "Page F", uv: 239, pv: 2400, amt: 2500 },
//   { name: "Page G", uv: 349, pv: 2400, amt: 2100 },
// ];

// const Dashboard = () => {
//   const [rent, setRent] = useState(0);
//   const [sell, setSell] = useState(0);
//   const [totalProject, setTotalProject] = useState(0);
//   const [user, setUser] = useState(0);
//   const [leads, setLeads] = useState(0);
//   const [monthlyLeads, setMonthlyLeads] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("https://api.100acress.com/snapShot");
//         // console.log(res,"yugyugygyg")
//         setRent(res.data.totalRentposted);
//         setSell(res.data.totalSellposted);
//         setTotalProject(res.data.totalProject);
//         setUser(res.data.totalUser);
//         setLeads(res.data.totalprojectLeads);
//         setMonthlyLeads(res.data.monthlyLeads); 
//       } catch (error) {
//         console.log("error")
//       }
//     };
//     fetchData();
//   }, []);
//   return (
//     <>
//       <div className="flex h-screen">
//         <div className="w-1/5 bg-black text-white">
//           <Sidebar /> 
//         </div>
//         <div className="flex-1 overflow-auto">
//           <div className="flex justify-between w-full h-12 bg-blue-200 p-2 pt-1">
//             <div>
//               <FiAlignJustify className="w-8 h-8 p-1" />
//             </div>
//             <p className="text-xl text-center p-1">1OOAcress Dashboard</p>
//             <img
//               src="../../Images/dashboard-avatra.jpg"
//               className="w-8 h-8 rounded-full pt-1"
//             />
//           </div>
//           <div className="flex flex-col lg:flex-row gap-4 p-4">
//             <div className="w-full lg:w-1/3 pt-4">
//               <h4 className="pb-2 text-center">Total Property Listing</h4>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {rent != null ? (
//                   <>
//                     <div className=" rounded-lg shadow-lg p-2 bg-blue-200 text-center">
//                       <div className="flex text-center  ">
//                         <TbDoorEnter className="inline mt-1 text-2xl" />
//                         <p className="text-lg font-medium mb-2 pl-8">Rent</p>
//                       </div>
//                       <p className="text-black text-2xl">{rent}</p>
//                     </div>
//                   </>
//                 ) : (
//                   <>null</>
//                 )}
//                 {sell != null ? (
//                   <>
//                     <div className="bg-purple-200 rounded-lg shadow-lg p-2 text-center">
//                       <div className="flex text-center space-x-1   ">
//                         <FaSellcast className="inline mt-1 text-2xl" />
//                         <p className="text-lg font-medium pl-8 mb-2 ">Sell</p>
//                       </div>
//                       <p className="text-black text-2xl">{sell}</p>
//                     </div>
//                   </>
//                 ) : (
//                   <>null</>
//                 )}
//                 {totalProject != null ? (
//                   <>
//                     {" "}
//                     <div className=" bg-orange-200 rounded-lg shadow-lg p-2 text-center">
//                       <div className="flex text-center space-x-2 ">
//                         <GoProjectRoadmap className="inline mt-1 text-2xl" />
//                         <p className="text-lg font-medium  mb-2">
//                           Total Project
//                         </p>
//                       </div>
//                       <p className="text-black text-2xl">{totalProject}</p>
//                     </div>
//                   </>
//                 ) : (
//                   <>null</>
//                 )}
//                 {user != null ? (
//                   <>
//                     {" "}
//                     <div className=" bg-green-200 rounded-lg shadow-lg p-2 text-center">
//                       <div className="flex text-center space-x-2">
//                         <HiOutlineUsers className="inline mt-1 text-2xl" />
//                         <p className="text-lg font-medium  mb-2">Total Users</p>
//                       </div>
//                       <p className="text-black text-2xl">{user}</p>
//                     </div>
//                   </>
//                 ) : (
//                   <>null</>
//                 )}
//                 {leads != null ? (
//                   <>
//                     {" "}
//                     <div className="bg-red-100 rounded-lg shadow-md p-2 text-center">
//                       <div className="flex text-center space-x-2">
//                         <GrProjects className="inline mt-1 text-2xl" />
//                         <p className="text-lg font-medium mb-2">
//                           Total Projects Leads
//                         </p>
//                       </div>
//                       <p className="text-black text-2xl">{leads}</p>
//                     </div>
//                   </>
//                 ) : (
//                   <>null</>
//                 )}

//                 <div className="bg-blue-200 rounded-lg shadow-lg p-2 text-center">
//                   <div className="flex text-center space-x-1">
//                     <SiOpenproject className="inline mt-1 text-2xl" />
//                     <p className="text-lg font-medium  mb-2">Resale Enquiry</p>
//                   </div>
//                   <p className="text-black text-2xl">....</p>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full h-[445px] lg:w-2/3 mt-2">
//               <div className="bg-white rounded-lg shadow-lg p-2 mt-4">
//                 <Chart
//                   leads={monthlyLeads}
//                   totalleads={leads}
//                   className="h-[391px]"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="w-full flex flex-col lg:flex-row p-4">
//             <div className="w-3/5">
//               <div className=" bg-white rounded-lg shadow-xl mt-4 ">
//                 <LineChart
//                   width={600}
//                   height={300}
//                   data={data}
//                   margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
//                 >
//                   <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line
//                     type="monotone"
//                     dataKey="uv"
//                     stroke="#8884d8"
//                     strokeWidth={2}
//                     dot={{ stroke: "#8884d8", strokeWidth: 2 }}
//                   />
//                 </LineChart>
//               </div>
//             </div>
//             <div className="w-2/5 my-10">
//               <div className="grid grid-cols-1 space-y-2 p-4 ">
//                 <div className="bg-red-100 h-20 text-2xl px-3 text-center pt-4">
//                   Buy
//                 </div>
//                 <div className="bg-orange-400 h-20 text-2xl px-3 text-center pt-4">
//                   Rent
//                 </div>
//                 <div className="bg-indigo-300 h-20 text-2xl px-3 text-center pt-4">
//                   Sell
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;




import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <div>This Dashboard is under maintainance...</div>
      <button className='p-2 my-4 rounded bg-primaryRed text-white font-semibold' onClick={() => navigate('/admin/user')}>Go to User</button>
    </div>
  )
}

export default Dashboard