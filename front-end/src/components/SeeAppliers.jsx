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
  const onePost = location.state.id;

    const [data,setData]=useState({})

   
    
}

export default SeeAppliers