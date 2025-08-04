import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { MdLocationPin } from "react-icons/md";
import axios from "axios";


function StarCard() {
//   useEffect(() => {
    
//     const fetchData = async () => {
//         try {
//             const res = await axios.get('https://acre.onrender.com/project/trending');
//             setTrendingProject(res.data.data);
//             // console.log(trendingProject, "trending project");
//         } catch (error) {
//             console.log(error || error.message);
//         }
//     }
//     fetchData();
// }, []);

// useEffect(()=>{
//    console.log(trendingProject,"final")
// },[trendingProject])



const [trendingProject, setTrendingProject] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    if (!hasFetchedData) {
      const fetchData = async () => {
        try {
          const res = await axios.get('/api/property/buy/ViewAll');
          setTrendingProject(res.data.ResaleData);
          setHasFetchedData(true);
        } catch (error) {
          console.log(error || error.message);
        }
      }
      fetchData();
    }
  }, [hasFetchedData]);

  useEffect(() => {
    console.log(trendingProject, "final");
  }, [trendingProject]);

  
  return (
    <Wrapper className="section">
      {
        trendingProject.map((item,index)=>{
          return(
            <div className='w9HDn0' key={index}>
            <div className='sQoIH w-100 h-auto'>
              <div className='xjNJ w-100'>
                <img
                  src={item.frontImage.url}
                  alt='image'
                  className="w-100 h-100 object-cover"
                />
              </div>
              <div className='eoiU d-flex align-items-center'>
                <div className='dsfds43 d-flex align-items-center'>
                  <div className='q2jam'>
                    <MdLocationPin size={14} color='#0a9e88' />
                  </div>
                  <div style={{ fontWeight: "600", fontSize: "14px" }}>Delhi</div>
                </div>
              </div>
            </div>
            <div className='w238N'>
              <h2>{item.projectName}</h2>
              <p style={{ margin: "0", marginTop: "14px" }}>
                Starting at <span>₹ {item.price} CR/-</span>
              </p>
            </div>
          </div>
          )
        })
      }

      {/* <div className='w9HDn0'>
        <div className='sQoIH w-100 h-auto'>
          <div className='xjNJ w-100'>
            <img
              src='https://media.istockphoto.com/id/1281554848/photo/dream-home-luxury-house-success-suburban-house.jpg?s=612x612&w=0&k=20&c=TpI1wOZx5-v0GlIfNORAHV7z6Hfd_TRrHKKzxO5nvwI='
              alt='image'
              className="w-100 h-100"
            />
          </div>
          <div className='eoiU d-flex align-items-center'>
            <div className='dsfds43 d-flex align-items-center'>
              <div className='q2jam'>
                <MdLocationPin size={14} color='#0a9e88' />
              </div>
              <div style={{ fontWeight: "600", fontSize: "14px" }}>Delhi</div>
            </div>
          </div>
        </div>
        <div className='w238N'>
          <h2>Project Name</h2>
          <p style={{ margin: "0", marginTop: "14px" }}>
            Starting at <span>₹ 3Cr CR/-</span>
          </p>
        </div>
      </div> */}
    </Wrapper>
  );
}

export default StarCard;

const Wrapper=styled.section`
*{
  font-family: 'DM Sans', sans-serif;
}
.w9HDn0 {
    height: auto;
    min-height: 280px;
    border-radius: 15px;
    margin: 0 5px 12px 10px;
    background-color: #FFF8F0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  .w9HDn0:hover {
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  .sQoIH {
    margin-bottom:10px;
  }
  .xjNJ {
    height: 200px;
  }
  .xjNJ img {
    border-radius: 15px 15px 0 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .dsfds43{
    padding:2px;
    color:#0a9e88;
  }
  .q2jam{
    padding:0px 7px;
  }
  .w238N h2{
    color:#000000;
    font-size:1.3vw;
    font-weight:600;
    padding-left:8px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    line-height:1;
  }
  .w238N p{
    font-size:1vw;
    font-weight:400;
    color:#000000;
    padding-left:8px;
    line-height:0;
  }
  .w238N p span{
    color:#000000;
    font-size:1.2vw;
    font-weight:600;
    padding-left:8px;
  }
  .w9HDn0:hover{
    cursor:pointer;
  }
  @media screen and (max-width:768px){
    .w9HDn0 {
      margin: 0 8px 16px 8px;
      border-radius: 12px;
    }
    .xjNJ {
      height: 200px;
    }
    .xjNJ img {
      border-radius: 12px 12px 0 0;
    }
    .w238N h2{
      font-size: 16px;
      padding-left: 12px;
      padding-right: 12px;
    }
    .w238N p{
      font-size: 14px;
      padding-left: 12px;
      padding-right: 12px;
    }
    .w238N p span{
      font-size: 16px;
      padding-left: 12px;
      padding-right: 12px;
    }
  }
  @media screen and (max-width:600px){
    .w238N h2{
      font-size:large;
    }
    .w238N p{
      font-size:medium;
    }
    .w238N p span{
      font-size:large;
    }
  }
`

// box-shadow: 0px 0px 30px 0px #0000001a;
