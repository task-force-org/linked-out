import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
function PostDtails() {
  const navigate = useNavigate();
  const location = useLocation();
  const onePost = location.state.data;
  const cid = location.state;
  const Uid = location.state.Uid;
  const [app, setApp] = useState([]);
  const application = {
    idposts: onePost["idposts-company"],
    idcompany: onePost["company_idcompany"],
    userID: Uid,
  };
  console.log(application);
  useEffect(() => {
    if (location.pathname === "/PostDtails") {
      require("./css/one.css");
      require("./css/login.css");
    }
  }, [location.pathname]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/apply/${onePost["idposts-company"]}`)
      .then((res) => {
        console.log(res);
        setApp(res.data);
        console.log(app);
      })
      .catch((err) => console.log(err));
  }, []);

  const post = {
    id: onePost["idposts-company"],
    number: app.length,
  };

  const postApplication = (event) => {
    event.preventDefault();
    console.log(application);
    axios
      .post("http://localhost:5000/user/apply", application)
      .then((res) => {
        window.location.reload();

        axios
          .patch("http://localhost:5000/user/apply", post)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const reload = () => {
    window.location.reload();
    window.history.back();
  };

  return (
    <div className="card posts-container" id="one-post-container">
      <div className="card-body">
        <div className="row">
          <div className="col-md-3">
            <img src={onePost.img} className="img-fluid" alt="Company Logo" />
            <h5 className="card-title">{onePost.company_name}</h5>
            <p className="card-text">
              <small className="text-muted">{onePost.post_date}</small>
            </p>
          </div>
          <div className="col-md-9">
            <div className="card mb-3">
              <img src={onePost.post_img} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{onePost.post_description}</h5>
                <p className="card-text">{onePost.posts_details}</p>
                <p className="card-text">
                  <small className="text-muted">
                    number of appliers {app.length}
                  </small>
                </p>
              </div>
              <Button
                variant="primary"
                onClick={(event) => {
                  postApplication(event);
                }}
              >
                Apply
              </Button>
            </div>
          </div>
          <button onClick={() => reload()}>back</button>
          <button
            onClick={() => {
              navigate("/");
              window.location.reload();
            }}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDtails;
