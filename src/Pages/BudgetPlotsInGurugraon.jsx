import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { EyeIcon } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const BudgetPlotsInGurugraon = () => {

  useEffect(() => { AOS.init(); }, []);

  const budgetPlots = [
    {
      title:"Signature FarukhNagar",link:"/signature-farukhnagar-plots/",image:"https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/budgetplots/faruknagar.webp"
    },
    {
      title:"Signature Sidhrawali / NH-8",link:"/signature-global-plots/",image:"https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/budgetplots/colors.jpg"
    },
    {
      title:"BPTP Limited",link:"/bptp-plots-gurugram/",image:"https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/budgetplots/bptp.webp"
    },
    {
      title:"ORRIS Group",link:"/orris-plots-gurugram/",image:"https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/budgetplots/Orris.jpg"
    },
    // {
    //   title:"JMS Group",link:"/jms-plots-gurugram/",image:"../../Images/jms.jpg"
    // }
  ];

  return (
    <Wrapper className="section">
    <div data-aos="zoom-in-up" className="container" style={{ boxShadow: "0px 0px 0px 0px #0000001a" }}>
      <div className="flex items-center justify-between mx-3 sm:mx-4 lg:mx-4 xl:mx-14 md:mx-4">
        <h1 className="text-3xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-left pt-4 ">
        Budget Plots in Gurugram
        </h1>
        <div className=" ml-2 hidden sm:block">
        <Link to="/plots-in-gurugram/" target="_top">
        <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
          <EyeIcon />
          <span className="ml-2">View All</span>
        </span>
        </Link>
      </div>
      </div>
      <div className="grid  lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 mx-0 gap-3 pb-2 pt-3">
        {budgetPlots.map((project, index) => (
          <Link to={project.link} key={index} className="card">
            <img src={project.image} alt={project.title} className="card-image" />
            <button className="card-button bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800">{project.title}</button>
          </Link>
        ))}
      </div>
    </div>
  </Wrapper>
  );
};

export default BudgetPlotsInGurugraon;

const Wrapper = styled.section`
  .container {
    max-width: 1250px;
    margin: auto;
    padding: 10px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }

  .view-all {
    text-decoration: none;
    font-size: 1rem;
    color: #ff0000;
    font-weight: 600;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    text-decoration: none;
    background: #fff;
    padding: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px);
  }

  .card-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
  }

  .card-button {
    width: 100%;
    margin-top: 10px;
    border-radius:10px;
    padding: 10px 0px;
    background-color: #C13B44;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    cursor: pointer;
    text-transform: capitalize;
    transition: background-color 0.3s ease;
  }

  .card-button:hover {
    background-color: #7C1920;
  }

  @media (max-width: 768px) {
    .title {
      font-size: 1.25rem;
    }

    .card-image {
      height: 150px;
    }

    .card-button {
      font-size: 0.9rem;
    }
  }
`;

// <div className="mt-4 mb-4">
// <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6">
//   <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-left">
//     Budget Plots in Gurugram
//   </h1>
//   <div className="hidden sm:block">
//     <Link to="/plots-in-gurugram/" target="_top">
//     <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
//       <ScaleLoader color="#FFFFFF" height={20} width={3} />
//       <span className="ml-2">View All</span>
//     </span>
//     </Link>
//   </div>
// </div>

// <div className="grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 grid-cols-1 mx-11 gap-3 pb-5 pt-3 ">
//   <Link to={`/signatureglobal-plots-gurugram/`} target="_top">
//     <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
//       <img
//         src="../../Images/signatureimge.webp"
//         className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
//       />
//       <div className="absolute inset-0 bg-black opacity-30"></div>
//       <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl text-center whitespace-nowrap">
//         Signature  <br />
//         <span className="block w-full">Sidhrawali Plots</span>
//       </h3>
//     </div>
//   </Link>

//   <Link to={`/bptp-plots-gurugram/`} target="_top">
//     <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
//       <img
//         src="../../Images/bptp.webp"
//         className="w-full  h-40 object-cover transition-transform duration-300 group-hover:scale-110"
//       />
//       <div className="absolute inset-0 bg-black opacity-30"></div>
//       <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-2xl">
//         BPTP Limited
//       </h3>
//     </div>
//   </Link>

//   <Link to={`/orris-plots-gurugram/`} target="_top">
//     <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
//       <img
//         src="../../Images/Orris.webp"
//         className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
//       />
//       <div className="absolute inset-0 bg-black opacity-30"></div>
//       <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-2xl">
//         ORRIS Group
//       </h3>
//     </div>
//   </Link>

//   <Link to={`/jms-plots-gurugram/`} target="_top">
//     <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
//       <img
//         src="../../Images/jms.webp"
//         className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
//       />
//       <div className="absolute inset-0 bg-black opacity-30"></div>
//       <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-2xl">
//         JMS Group
//       </h3>
//     </div>
//   </Link>

//   {/* <Link to={`/rof-plots-gurugram/`} target="_top">
//     <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
//       <img
//         src="../../Images/rof.webp"
//         className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
//       />
//       <div className="absolute inset-0 bg-black opacity-30"></div>
//       <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-3xl">
//         ROF Group
//       </h3>
//     </div>
//   </Link> */}
// </div>
// </div>