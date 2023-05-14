import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EditProfileCompany from "./EditProfileCompany";

function CompanyDetails() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  var id = location.state.data.idcompany;
  useEffect(() => {
    if (location.pathname === "/companyDetails") {
      require("../css/Userdetails.scss");
      require("../css/login.css");
    }
  }, [location.pathname]);

  const handleDeletePost = (event, postID) => {
    console.log(postID);
    const url = `http://localhost:5000/company/post/${postID}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        console.log("Post deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting post:", err);
      });
    window.location.reload();
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
        const { data } = await axios.get(
          `http://localhost:5000/company/get/${id}`
        );
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
    console.log(id);
  }, [id]);

  if (Object.keys(data).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wrapper">
      <nav className="navbar"></nav>
      <div className="content">
        <div className="display-item">
          <div className="profile-container">
            <div className="card">
              <div className="card-top"></div>
              <div className="card-profile">
                <div className="profile-image">
                  <img src={data.img} alt="User Profile Pic" />
                </div>
              </div>
              <div className="card-info">
                <div className="info-title">
                  <h2>{data.company_name}</h2>
                  <h3>{data.email}</h3>
                </div>
                <div className="info-follow"></div>
                <div className="info-bio">
                  <p>{data.description}</p>
                </div>
              </div>
            </div>
            {!isEditing && (
              <button className="edit-profile-btn" onClick={handleEditProfile}>
                Edit Profile
              </button>
            )}
            {isEditing && (
              <EditProfileCompany data={data} onSave={handleSaveProfile} />
            )}
            <button
              className="add-post-btn"
              onClick={() =>
                navigate("/addpostCompony", { state: { ids: id } })
              }
            >
              Add Post
            </button>
          </div>
          <div className="posts-container">
            {posts.map((post) => {
              const postDtails = {
                post_title: post.post_title,
                post_aplliers: post.post_aplliers,
                posts_details: post.posts_details,
                post_img: post.post_img,
                post_description: post.post_description,
                post_date: post.post_date,
                company_name: data.company_name,
                img: data.img,
                idcompany: data.idcompany,
                "idposts-company": post["idposts-company"],
              };
              return (
                <div className="card post">
                  <div className="card-top"></div>
                  <div className="card-profile">
                    <div className="profile-image">
                      <img src={post.post_img} alt="Post Image" />
                    </div>
                  </div>
                  <div className="card-info">
                    <div className="info-title">
                      <h2>{post.post_title}</h2>
                    </div>
                    <div className="info-bio">
                      <p>{post.post_description}</p>
                    </div>
                    <div className="info-social">
                      <button
                        className="delete-post-btn"
                        onClick={(event) =>
                          handleDeletePost(event, post["idposts-company"])
                        }
                      >
                        Delete Post
                      </button>
                      <button
                        className="see-appliers-btn"
                        onClick={(event) =>
                          navigate("/SeeAppliers", { state: { idP: post } })
                        }
                      >
                        See Appliers
                      </button>
                      <button
                        className="post-details-btn"
                        onClick={() => {
                          navigate("/PostDtails", {
                            state: { data: postDtails },
                          });
                          window.location.reload();
                        }}
                      >
                        Post Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;
