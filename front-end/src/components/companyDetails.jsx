import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css";
import "../css/CDetails.css"
import Button from 'react-bootstrap/Button';

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
import EditProfileCompany from "./EditProfileCompany"



function CompanyDetails() {
  const navigate=useNavigate()
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  var id = location.state.data.idcompany||location.state.id;//this condition need to be checked 

console.log(id,"data")

  const handleDeletePost = (event, postID) => {
    console.log(postID)
    const url = `http://localhost:5000/company/post/${postID}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      })
      .then(() => {
        console.log('Post deleted successfully');
      })
      .catch((err) => {
        console.error('Error deleting post:', err);
      });
      window.location.reload()
  };
  

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = (updatedProfile) => {
    setIsEditing(false);
    // Make a PUT request to update the profile in the backend
    axios
      .put(`http://localhost:5000/company/${data.id}`, updatedProfile)
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => console.error(err));
  };






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
      .get(`http://localhost:5000/company/post/${id}`)
      .then(({ data }) => setPosts(data))
      .catch((err) => console.log(id));
      console.log(id)
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
      {!isEditing && <Button variant="primary" onClick={handleEditProfile}>Edit Profile</Button>}
        {isEditing && <EditProfileCompany data={[data]} onSave={handleSaveProfile} />}
{<Button variant="primary" onClick={()=>navigate("/addpostCompony",{ state: { id: id } })}>add post</Button>}

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
          <>
           
          <MDBRow className="row-cols-1 row-cols-md-2 g-4">
          <MDBCol>
            {}
            <MDBCard onClick={()=>{
              console.log(postDtails)
              navigate("/PostDtails", { state: { data: postDtails } })} }>
              <MDBCardImage src={post.post_img} alt="..." position="top" />
              <MDBCardBody>
                <MDBCardTitle>{post.post_title}</MDBCardTitle>
                <MDBCardText>{post.post_description}</MDBCardText>
              </MDBCardBody> 
              </MDBCard><Button variant="primary" onClick={(event)=>navigate("/SeeAppliers", { state: { id: post["idposts-company"] } })}>see appliers</Button>
          </MDBCol> <Button variant="primary" onClick={(event)=>handleDeletePost(event,post["idposts-company"])}>delete post</Button>
        </MDBRow> <Button variant="primary" onClick={()=>navigate("/SeeAppliers",{ state: { id:post["idposts-company"] } })}>add post</Button>
        </>
        )
      }
        
       
      )}
      <Footer/>
    </div>
  );
}

export default CompanyDetails;










