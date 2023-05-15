import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfil";

function UserDetails() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const PathData = location.state.data;
  const [isEditing, setIsEditing] = useState(false);
  const id = PathData.userID;
  useEffect(() => {
    if (location.pathname === "/userProfile") {
      require("../css/Userdetails.scss");
      require("../css/login.css");
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/individual/get/${id}`
        );
        setData(data);
        console.log(data);
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
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = (updatedProfile) => {
    setIsEditing(false);
    axios
      .put(`http://localhost:5000/individual/${data.id}`, updatedProfile)
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div class="wrapper">
      <nav class="navbar"></nav>
      <div class="content">
        <div class="display-item">
          <div class="card">
            <div class="card-top"></div>
            <div class="card-profile">
              <div class="profile-image">
                <img src={data[0].profile_pic} alt="User Profile Pic" />
              </div>
            </div>
            <div class="card-info">
              <div class="info-title">
                <h2>{data[0].full_name}</h2>
                <h3>{data[0].job_title}</h3>
              </div>
              <div class="info-follow">
                <div class="follow-followers">
                  <span>{data[0].experiences}</span>
                  <br />
                  <span>Experience</span>
                </div>
                <div class="follow-following">
                  <span>{data[0].education}</span>
                  <br />
                  <span>Education</span>
                </div>
                <div class="follow-likes">
                  <span>{data[0].userID}</span>
                  <br />
                  <span>Likes</span>
                </div>
              </div>
              <div class="info-bio">
                <p>{data[0].bio}</p>
              </div>
            </div>
          </div>
          <div className="btn">
            <button variant="primary" onClick={handleEditProfile}>
              Edit Profile
            </button>
            {isEditing && (
              <EditProfile data={data} onSave={handleSaveProfile} />
            )}
          </div>
          <button
            variant="primary"
            onClick={() => {
              navigate("/companyPosts", { state: { id: id } });
              window.location.reload();
            }}
          >
            view posts
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
