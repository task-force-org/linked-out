import axios from "axios";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navbar from "./Navbar";
import "../css/App.css";
import EditProfile from './EditProfil'
import { useLocation } from "react-router-dom";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from "react-router-dom";



const UserDetails = (props) => {
  const navigate = useNavigate();
  // const history = useHistory();
  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  // const navigate=useNavigate()

  const handleCheckDetails = () => {
    navigate("/check-details");
  };
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/userProfil") {
      require("../css/App.css");
    }
  }, [location.pathname]);

 


  const handleDeletePost = (postID) => {
    const url = `http://localhost:5000/individual/posts/${postID}`; // na9sa zada el user id 
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
  };




  useEffect(() => {
    // const { id } = props;
    axios
      .get(`http://localhost:5000/individual/get/`)
      .then(({ data }) => {
        // console.log(data)
        setUsers(data[0]);
      })
      .catch((err) => console.error(err));
  }, []);
  // console.log('props.id:',users);

  useEffect(() => {
    if (users) {
      axios
        .get(`http://localhost:5000/individual/posts?individual_userID=${users.userID}`)
        .then(({ data }) => {
          setPosts(data);
        })
        .catch((err) => console.error(err));
    }
  }, [users]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = (updatedProfile) => {
    setIsEditing(false);
    // Make a PUT request to update the profile in the backend
    axios
      .put(`http://localhost:5000/individual/${users.userID}`, updatedProfile)
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => console.error(err));
  };


console.log(users)
  const handleCount=()=>{
    posts.post_appliers+=1
  }

  

  return (
    <>
    {/* <div className="fix">
    <Navbar/>
    </div> */}
    <div className="profile-info">
      {users && (
        <>
          <MDBCard>
  <MDBCardBody>
    <MDBRow>
    <span style={{ textAlign: 'left' }}>
  <MDBCol md="1">
    <MDBCardImage src={users.profile_pic} alt="Profil Avatar" className="avatar" style={{ width: '400px', height: '300px' }} />
  </MDBCol>
</span>
      <MDBCol md="7">
        <MDBCardTitle>{users.full_name}</MDBCardTitle>
        <MDBCardText>{users.email}</MDBCardText>
        <MDBCardText>{users.bio}</MDBCardText>
        {users.experiences && (
          <>
            <h3 className="experiences">Experiences:</h3>
            <ul>
              <li>{users.experiences}</li>
            </ul>
          </>
        )}
        {users.education && (
          <>
            <h3 className="education">Education</h3>
            <ul>
              <li>{users.education}</li>
            </ul>
          </>
        )}
        {!isEditing && <Button variant="primary" onClick={handleEditProfile}>Edit Profile</Button>}
        {isEditing && <EditProfile user={users} onSave={handleSaveProfile} />}
      </MDBCol>
    </MDBRow>
  </MDBCardBody>
</MDBCard>
          
        
        </>
      )}
      {posts.length > 0 && (
        <>
          <h3 className="posts">Posts:</h3>
          <Button variant="primary" onClick={()=>navigate("/addpost")}>add post</Button>
          <div className="card-container">
            {posts.map((post) => (
              <Card key={post.idposts_users} style={{ width: "40rem" }}>
                {post.post_img && (
                  <Card.Img
                    variant="top"
                    src={post.post_img}
                    alt={post.post_title}
                  />
                )}
                <Card.Body>
                  <Card.Title>{post.post_title}</Card.Title>
                  <Card.Text>{post.post_description}</Card.Text>
                  <Button variant="primary" onClick={handleCheckDetails}>Check details</Button>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Posted on {post.post_date}
                  </small>
                  <p>Appliers: {post.post_appliers}</p>
                </Card.Footer>
                
 
<div>
<Button variant="primary" onClick={handleCount}>apply</Button>
                <Button variant="primary" onClick={handleDeletePost}>delete post</Button>
</div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default UserDetails;