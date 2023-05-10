import axios from "axios";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import EditProfile from "./EditProfil";

const UserDetails = (props) => {
  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const { name } = props;
    axios
      .get(`http://localhost:5000/users/${name}`)
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => console.error(err));
  }, [props]);

  useEffect(() => {
    if (users) {
      axios
        .get(`http://localhost:5000/posts?individual_userID=${users.userID}`)
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
      .put(`http://localhost:5000/users/${users.userID}`, updatedProfile)
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="profile-info">
      {users && (
        <>
          <img src={users.profile_pic} alt="Profil Avatar" className="avatar" />
          <h2 className="name">{users.full_name}</h2>
          <p className="email">{users.email}</p>
          <p className="bio">{users.bio}</p>
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
        </>
      )}
      {posts.length > 0 && (
        <>
          <h3 className="posts">Posts:</h3>
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
                  <Button variant="primary">Check details</Button>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Posted on {post.post_date}
                  </small>
                  <p>Appliers: {post.post_appliers}</p>
                </Card.Footer>

              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetails;
