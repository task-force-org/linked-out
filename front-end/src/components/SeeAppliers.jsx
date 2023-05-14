import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useLocation } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import EditProfile from './EditProfil'
import "bootstrap/dist/css/bootstrap.css";
import "../css/CDetails.css"
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol
  } from 'mdb-react-ui-kit';
  import Footer from "./Footer";
import Navbar from "./Navbar";


function SeeAppliers(){
  const location = useLocation();
  const id = location.state.id;

    const [data,setData]=useState(null)

   const getAppliers=()=>{
    axios.get(`http://localhost:5000/app/applications/${id}`)
    .then((res)=>{
      console.log(res.data)
setData(res.data)
    })
    .catch((err)=>console.log(id,'ID'))
   }
   useEffect(()=>{
    getAppliers()
   },[])
   if(data===null){
    console.log(data,'data')
    return(
      <h1>no appliers for the time being</h1>
    )
   }
    
}

export default SeeAppliers