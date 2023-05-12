import React,{useEffect,useState} from "react";
import { useLocation } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import "../onePost.css"
import "bootstrap/dist/css/bootstrap.css";
import Button from 'react-bootstrap/Button';
import axios from "axios";
function PostDtails(){
  const navigate=useNavigate()
  const location = useLocation();
  const onePost = location.state.data;
const [app,setApp]=useState([])
  const application={
  
    idposts:onePost["idposts-company"],
    idcompany:onePost.idcompany,
    userID:7
    
    
  }

  useEffect(()=>{
    axios.get(`http://localhost:5000/user/apply/${onePost["idposts-company"]}`)
    .then((res) => {
      console.log(res)
      setApp(res.data);
      console.log(app)})
      .catch((err)=>console.log(err))

  },[])
  
  const post={
    id:onePost["idposts-company"],
    number: app.length

  }
  

  
const postApplication = (event) => {
  event.preventDefault();
console.log(onePost)
  axios.post("http://localhost:5000/user/apply", application)
    .then((res) => {
      console.log(res);
      console.log(app)
   

          axios.patch("http://localhost:5000/user/apply", post)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
       
        
    })
    .catch((err) => console.log(err));
};

  



return (
<div  >
    
<div  class="card">
  <div class="card-body" onClick={()=>navigate("/companyDetails", { state: { id: onePost.idcompany } }) } > <img src={onePost.img} class="img" alt="..."/>
    <h5 class="card-title" onClick={()=>navigate("/companyDetails", { state: { id: onePost.idcompany } }) }>{onePost.company_name}</h5>
   
    <p class="card-text"><small class="text-muted">{onePost.post_date}</small></p>
  </div>
  
</div>

<div class="card mb-3">
  <img src={onePost.post_img} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{onePost.post_description}</h5>
    <p class="card-text">{onePost.posts_details}</p>
    <p class="card-text"><small class="text-muted">number of appliers {app.length}</small></p>
  </div>
  <Button variant="primary" onClick={(event)=>postApplication(event)} >Apply</Button>
</div>

</div>
)

}




export default PostDtails



