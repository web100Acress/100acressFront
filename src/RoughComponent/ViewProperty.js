import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useProductContext } from '../Context/productContext';
import { InfinitySpin } from  'react-loader-spinner'

function ViewProperty() {

    const {singleProperty,isSingleLoading,getSingleProduct} = useProductContext();
    const {id}=useParams();

    const API= "https://api.100acress.com/preLaunch/view";

    useEffect(()=>{
        getSingleProduct(`${API}/${id}`);
      },[])
       
      console.log(singleProperty);
      
      
      if(isSingleLoading){
        return( 
          <div style={{margin:"30vh 30vw 30vh 43vw"}}>
            <InfinitySpin width='500' color="red"/>
          </div>
          )
      }
    
      const {amentites,builderName,aboutProject,city,configuration,location,maxCovered_Area,minCovered_Area,price,projectName,rera_No,status,photo,featured,floorPlan,sitePlan,locationMap} = singleProperty;
      if (!photo) {

        return (
          <Wrapper className="section">
            <div>Loading...</div>
          </Wrapper>
        );
      }
      const UrlAdmin="/protected/private/admin";
  return (
    <Wrapper className="div">
    <div className="formS">
    <div style={{textAlign:"center",fontWeight:"bold",fontSize:"25px",paddingBottom:"10px",borderBottom:"1px solid grey"}}>Project Detail</div>
    <form>
    <div style={{marginTop:"20px",marginBottom:"5px",fontWeight:"bold"}}>Project Name</div>
     <input type="text" placeholder="Project Name" name="projectName" readOnly value={projectName}/>
     <div style={{marginTop:"20px",marginBottom:"5px",fontWeight:"bold"}}>Location</div>
     <input type="text" placeholder="location" name="location" readOnly value={location}/>
     <div style={{marginTop:"20px",marginBottom:"5px",fontWeight:"bold"}}>Configurations</div>
     <input type="text" placeholder="Configuration (ex. 2bhk - 3bhk)" name="configuration" readOnly value={configuration}/>
     <div style={{marginTop:"20px",marginBottom:"5px",fontWeight:"bold"}}>Price</div>
     <input type="number" placeholder="Price" min={0} name="price"readOnly value= {`${price}`}/>
     <div className="form_section">
     <div style={{marginTop:"20px",marginBottom:"5px",fontWeight:"bold"}}>Status</div>
        <input type="text" name="status" id="status" readOnly value={status}/>
     </div>
     <div className="form_section" style={{marginBottom:"10px"}}>
     <div style={{marginTop:"20px",marginBottom:"5px",fontWeight:"bold"}}>Is it Featured</div>
        <input type="text" name="featured" id="featured" readOnly value={featured}/>
     </div>
     <div style={{marginTop:"20px",marginBottom:"5px",fontWeight:"bold"}}>Rera</div>
     <input type="text" placeholder="Rera no" name="rera_No" readOnly value={rera_No}/>
     <div style={{marginTop:"20px",marginBottom:"5px",fontWeight:"bold"}}>Minimum Covered Area</div>
     <input type="number" placeholder="minCovered Area (sq.ft.)" min={0} name="minCovered_Area" readOnly value={minCovered_Area}/>
     <div style={{marginTop:"20px",marginBottom:"5px",fontWeight:"bold"}}>Maximum Covered Area</div>
     <input type="number" placeholder="maxCovered Area (sq.ft.)" min={0} name="maxCovered_Area" readOnly value={maxCovered_Area}/>
     <div style={{marginTop:"20px",marginBottom:"5px",fontWeight:"bold"}}>About Project</div>
     <textarea id="w3review" name="aboutProject" readOnly value={aboutProject} rows={7}/>
     <div>
     <div style={{marginTop:"10px",marginBottom:"10px",fontWeight:"bold"}}>Builder Name</div>
     <input type="text" name="builderName" id="builderName" readOnly value={builderName}/>
   
     </div>
     <div style={{marginTop:"10px",marginBottom:"10px",fontWeight:"bold"}}>Location</div>
     <input type="text" name="location" id="location" readOnly value={city}/>
    
     <div>
     <div style={{marginTop:"20px",marginBottom:"5px",fontWeight:"bold"}}>Photos You Attached</div>  
     <img src={photo[0].url} alt="" style={{width:"100%"}}/>
     <div style={{display:"flex"}}>
     <img src={floorPlan.url} alt="" style={{width:"34%"}}/> 
     <img src={sitePlan.url} alt="" style={{width:"33%"}}/>
     <img src={locationMap.url} alt="" style={{width:"33%"}}/>
     </div>
     </div>
     <div className="amenitiesPage">
     <div style={{marginTop:"20px",marginBottom:"5px",fontWeight:"bold"}}>Amenitites Listed</div>
       <div className="d-flex flex-wrap">
        <textarea name="Amenities" id="amentities"  readOnly value={amentites} rows={7}/>
       </div>
     </div>
     <Link to={UrlAdmin} relative='path'>
     <button style={{marginTop:"10px",margin:"2% 45%",border:"none",background:"orange",padding:"5px 10px",borderRadius:"10px"}} >Back</button>
     </Link>
     </form>
    </div>
    </Wrapper>
  )
}

export default ViewProperty
const Wrapper = styled.div`
box-sizing:border-box;
width:100%;
.formS{
    margin:2rem auto;
    width:50%;
    padding:1rem;
    border:1px solid grey;
    border-radius:15px;
}
input[type="text"],input[type="number"]{
    width:100%;
    outline:none;
    border:0px solid;
}
textarea{
  outline:none;
  border:0px solid;
  width:100%;
}
`