import React from 'react'
import { styled } from 'styled-components'
import Image from "../../Images/etpb4z-kjnhxk-3t59vo.jpg"
import { Link } from 'react-router-dom';

function Carddev(elem) {
  
  const {photo,projectName,configuration,location,_id,url}=elem
  if (!elem || !elem.photo || !elem.projectName) {

    return (
      <Wrapper className="section">
        <div>Loading...</div>
      </Wrapper>
    );
  }
  const URLINK=`/${url}`
  projectName.replaceAll("-"," ");
  return (
    <Wrapper className="section">
    <Link to={URLINK} target='blank'>
    <div className='FkKMMM'>
      <div className="imGd">
      <img src={photo[0].url} alt="Building Image" className='bHN'/>
      </div>
      <div className="ffmj">
        <h3 style={{color:"#3b3939"}}>{projectName}</h3>
        <p className='dfg dhbM' style={{color:"grey"}}>{configuration}</p>
        <span className='dfg djnNN'>{location}</span>
      </div>
      </div>
      </Link>
    </Wrapper>
  )
}

export default Carddev

const Wrapper=styled.section`
.FkKMMM{
  width:250px;
  cursor:pointer;
}
.imGd{
    width:234px;
    height:215px;
}
.ffmj>h3{
  font-size:18px;
  font-weight:700;
  margin-bottom:9px;
  margin-top:10px;
}
.ffmj{
  padding:5px;
}
.bHN{
  width:100%;
  height:100%;
  object-fit:cover;
  border-radius:20px;
}
.dLM{
  font-size:large;
  margin-bottom:0px;
}
.dfg{
  margin:0px;
  font-size:13px;
}
.djnNN{
  margin-top:8px;
}
.dhbM{
  font-weight:600;
}
`
