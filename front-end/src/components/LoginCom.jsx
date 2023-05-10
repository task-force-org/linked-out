import React, { useState, useEffect } from "react";

import $ from "jquery";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/login.css";
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
  useEffect(() => {
    const signUpButton = $("#signUp");
    const signInButton = $("#signIn");
    const container = $("#container");

    signUpButton.on("click", () => {
      container.addClass("right-panel-active");
    });

    signInButton.on("click", () => {
      container.removeClass("right-panel-active");
    });

    return () => {
      // Clean up event listeners when the component unmounts
      signUpButton.off("click");
      signInButton.off("click");
    };
  }, []); //

  return (
    <div className="form-structor">
      <h1></h1>
      {view === "signup" && (
        <div className="signup">
          <h2>Weekly Coding Challenge #1: Sign in/up Form</h2>
          <div class="container" id="container">
            <div class="form-container sign-up-container">
              <form action="#">
                <h1>Create Account</h1>
                <div class="social-container">
                  <a href="#" class="social">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" class="social">
                    <i class="fab fa-google-plus-g"></i>
                  </a>
                  <a href="#" class="social">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </div>
                <span>or use your email for registration</span>
                <input
                  type="text"
                  placeholder="Name"
                  class="input"
                  id="signup-name"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  class="input"
                  id="signup-email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  class="input"
                  id="signup-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  class="submit-btn"
                  id="signup-btn"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
              </form>
            </div>
            <div class="form-container sign-in-container">
              <form action="#">
                <h1>Sign in</h1>
                <div class="social-container">
                  <a href="#" class="social">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" class="social">
                    <i class="fab fa-google-plus-g"></i>
                  </a>
                  <a href="#" class="social">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </div>
                <span>or use your account</span>
                <input
                  type="email"
                  placeholder="Email"
                  class="input"
                  id="login-email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  class="input"
                  id="login-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <a href="#" class="forgot-password">
                  Forgot your password?
                </a>
                <button class="submit-btn" id="login-btn">
                  Sign In
                </button>
              </form>
            </div>
            <div class="overlay-container">
              <div class="overlay">
                <div class="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>
                    To keep connected with us please login with your personal
                    info
                  </p>
                  <button class="ghost" id="signIn">
                    Sign In
                  </button>
                </div>
                <div class="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <button class="ghost" id="signUp">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>

          <footer>
            <p>
              Created with <i class="fa fa-heart"></i> by
              <a target="_blank" href="https://florin-pop.com">
                Florin Pop
              </a>
              - Read how I created this and how you can join the challenge
              <a
                target="_blank"
                href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/"
              >
                here
              </a>
              .
            </p>
          </footer>
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
