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
 
import Navbar from "../components/Navbar";




function UserDetails() {
  const navigate=useNavigate()
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const PathData= location.state.data
  const [isEditing, setIsEditing] = useState(false);
  const id = PathData.userID;




  const handleDeletePost = (event, postID) => {
    console.log(postID)
    const url = `http://localhost:5000/individual/posts/${postID}`;
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
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/individual/get/${id}`);
        setData(data)
      console.log(data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);






  useEffect(() => {
    axios
      .get(`http://localhost:5000/individual/posts/${id}`)
      .then(({ data }) => setPosts(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (Object.keys(data).length === 0) {
    return <div>Loading...</div>;
  }
  const handleEditProfile = () => {
    setIsEditing(true);
  };

    const handleSaveProfile = (updatedProfile) => {
      setIsEditing(false);
      // Make a PUT request to update the profile in the backend
      axios
        .put(`http://localhost:5000/individual/${data.id}`, updatedProfile)
        .then(({ data }) => {
          setData(data);
        })
        .catch((err) => console.error(err));
    };

  return (
    
    <div>
      {console.log(PathData)}
      <Navbar/>
    <div>
  <div className="div">
    <span className="container">
      <img className="img" src={data[0].profile_pic} alt="user Logo" />
      <h4 className="name">{data[0].full_name}</h4>
    </span>
  </div>
</div>
<h3 className="experiences">Experiences:</h3>
            <ul>
              <li>{data[0].experiences}</li>
            </ul>
     
      <h1>{data[0].bio}</h1>
      <h1>{data[0].email}</h1>
      {!isEditing && <Button variant="primary" onClick={handleEditProfile}>Edit Profile</Button>}
        {isEditing && <EditProfile data={data} onSave={handleSaveProfile} />}
{<Button variant="primary" onClick={()=>navigate("/addpost",{ state: { id: id } })}>add post</Button>}
      {posts.map((post) => {
    



        return (
          <MDBRow className="row-cols-1 row-cols-md-2 g-4">
          <MDBCol>
            {console.log(post,'post')}
            <MDBCard onClick={()=>{
              
              navigate("/check-details", { state: { data: post } })} }>
              <MDBCardImage src={post.post_img} alt="..." position="top" />
              <MDBCardBody>
                <MDBCardTitle>{post.post_title}</MDBCardTitle>
                <MDBCardText>{post.post_description}</MDBCardText>
              </MDBCardBody>
            </MDBCard> <Button variant="primary" onClick={(event)=>handleDeletePost(event,post["idposts-users"])}>delete post</Button>
          </MDBCol>
        </MDBRow>
        )
      }
        
       
      )}
   
    </div>
  );
}

export default UserDetails;

