import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
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
  import Footer from "../components/Footer";
import Navbar from "../components/Navbar";




function CompanyDetails() {
  const navigate=useNavigate()
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const id = location.state.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/company/get/${id}`);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/companies/${id}`)
      .then(({ data }) => setPosts(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (Object.keys(data).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar/>
    <div>
  <div className="div">
    <span className="container">
      <img className="img" src={data.img} alt="Company Logo" />
      <h4 className="name">{data.company_name}</h4>
    </span>
  </div>
</div>
      
     
      <h1>{data.description}</h1>
      <h1>{data.email}</h1>
     

      {posts.map((post) => {


const postDtails={
  post_title: post.post_title,
  post_aplliers: post.post_aplliers,
  posts_details: post.posts_details,
  post_img: post.post_img,
  post_description:post.post_description,
  post_date: post.post_date,
  company_name: data.company_name,
  img: data.img,
  idcompany: data.idcompany,
  "idposts-company":post["idposts-company"]
}


        return (
          <MDBRow className="row-cols-1 row-cols-md-2 g-4">
          <MDBCol>
            <MDBCard onClick={()=>{
              console.log(postDtails)
              navigate("/PostDtails", { state: { data: postDtails } })} }>
              <MDBCardImage src={post.post_img} alt="..." position="top" />
              <MDBCardBody>
                <MDBCardTitle>{post.post_title}</MDBCardTitle>
                <MDBCardText>{post.post_description}</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        )
      }
        
       
      )}
      <Footer/>
    </div>
  );
}

export default CompanyDetails;










