import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API = "http://localhost:5000/individual";

function LoginCom() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [experiences, setExperiences] = useState("");
  const [education, setEducation] = useState("");
  const [profile_pic, setProfilePic] = useState("");
  const [view, setView] = useState("signup");

  const user = {
    full_name: username,
    email: email,
    password: password,
    bio: bio,
    experiences: experiences,
    education: education,
    profile_pic: profile_pic,
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5000/individual/get/${username}`)
      .then((res) => {
        const user = res.data;
        user.map((e) => {
          console.log(e.username, e.userpassword, username, password);
          if (e.username === username && e.userpassword === password) {
            console.log("Login successful");
            setView("profile"); // Change view to profile after login
          } else {
            console.log("Wrong password");
          }
        });
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || username === "" || password === "") {
      alert("Please fill all the fields!");
    } else {
      setView("profile"); // Change view to profile after signup
    }
  };

  const handleCreateProfile = (e) => {
    e.preventDefault();
    axios
      .post(API, user)
      .then((res) => console.log(res.data).catch((err) => console.log(err)));
    console.log(user);
    navigate("/");
  };

  return (
    <div className="form-structor">
      <h1></h1>
      {view === "signup" && (
        <div className="signup">
          <h2 className="form-title" id="signup">
            <span>or</span>Sign up
          </h2>
          <div className="form-holder">
            <input
              type="text"
              className="input"
              placeholder="Full Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              className="input"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="submit-btn" onClick={handleSubmit}>
            Sign up
          </button>
        </div>
      )}
      {view === "login" && (
        <div className="login slide-up">
          <div className="center">
            <h2 className="form-title" id="login">
              <span>or</span>Log in
            </h2>
            <div className="form-holder">
              <input
                type="email"
                className="input"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="input"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="submit-btn" onClick={handleLogin}>
              Log in
            </button>
          </div>
        </div>
      )}
      {view === "profile" && (
        <div className="profile slide-up">
          <div className="center">
            <h2 className="form-title" id="login">
              <span>or</span>Create Profile
            </h2>
            <div className="form-holder">
              <input
                type="text"
                className="input"
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
              />
              <input
                type="text"
                className="input"
                placeholder="Experiences"
                onChange={(e) => setExperiences(e.target.value)}
              />
              <input
                type="text"
                className="input"
                placeholder="Education"
                onChange={(e) => setEducation(e.target.value)}
              />
              <input
                type="file"
                className="input"
                placeholder="Profile Picture"
                onChange={(e) => setProfilePic(e.target.value)}
              />
            </div>
            <button className="submit-btn" onClick={handleCreateProfile}>
              Create Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginCom;
