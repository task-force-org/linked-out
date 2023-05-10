import React,{useEffect,useState} from "react";
import "../App.css"
import "bootstrap/dist/css/bootstrap.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
function PostDtails({onePost}){

return (
<div  >
    
<div  class="card">
  <div class="card-body"> <img src={onePost.img} class="img" alt="..."/>
    <h5 class="card-title">{onePost.company_name}</h5>
   
    <p class="card-text"><small class="text-muted">{onePost.post_date}</small></p>
  </div>
  
</div>

<div class="card mb-3">
  <img src={onePost.post_img} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{onePost.post_description}</h5>
    <p class="card-text">{onePost.posts_details}</p>
    <p class="card-text"><small class="text-muted">number of appliers {onePost.post_aplliers}</small></p>
  </div>
  <Button variant="primary" >Apply</Button>
</div>

</div>
)

}




export default PostDtails