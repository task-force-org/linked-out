import React, { useState, useEffect } from "react";
import $ from "jquery";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
const API = "http://localhost:5000/company";
//login as a company

function LoginCom() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [profile_pic, setProfilePic] = useState("");
  const [view, setView] = useState("signup");
  const [data, setData] = useState([]);
  //change the format of the picture
  const handlePic = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      setProfilePic(reader.result);
    };
  };
  // conditional css
  useEffect(() => {
    if (location.pathname === "/company") {
      require("../css/login.css");
    }
  }, [location.pathname]);
  // the functionn that handle change in login
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
      signUpButton.off("click");
      signInButton.off("click");
    };
  }, []);
  //login functionality
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/company/authenticate`, {
        email: email,
        password: password,
      })
      .then((res) => {
        const token = res.data.token;
        console.log("Login successful");
        //here set the view or the path you want
        localStorage.setItem("token", token);
        axios
          .get(`http://localhost:5000/company/email/${email}`)
          .then((res) => {
            setData(res.data);

            navigate("/companyDetails", { state: { data: res.data } });
          });
      })
      .catch((err) => console.log(err));
  };

  // const login= async()=>{
  //   handleLogin()
  //   navigate("/companyPosts",{state: {data:data}})
  //   console.log(data)
  // }
  //signup functionality
  const handleSubmit = (e) => {
    //checking then complete the signup
    e.preventDefault();
    if (email === "" || username === "" || password === "") {
      alert("Please fill all the fields!");
    } else {
      setView("profile");
    }
  };
  //set the profile after signing
  const handleCreateProfile = async (e) => {
    e.preventDefault();
    const user = {
      company_name: username,
      description: bio,
      email: email,
      password: password,
      img: profile_pic,
    };
    try {
      const response = await axios.post(API, user);
      console.log(response.data);
      navigate("/");
      window.location.reload(); //change this to handle the navigation where you want
    } catch (err) {
      console.log(err);
    }
  };
  //XML
  return (
    <div className="form-structor">
      <h1></h1>
      {view === "signup" && (
        <div className="signup">
          <h2>Always make the oportunity for others.</h2>
          <div className="container" id="container">
            <div className="form-container sign-up-container">
              <form action="#">
                <h1>Create Account</h1>
                <div className="social-container">
                  <a href="#" className="social">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                  <a href="#" className="social">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
                <span>or use your email for registration</span>
                <input
                  type="text"
                  placeholder="Name"
                  className="input"
                  id="signup-name"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  id="signup-email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  id="signup-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="submit-btn"
                  id="signup-btn"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
              </form>
            </div>
            <div className="form-container sign-in-container">
              <form action="#">
                <h1>Log in</h1>
                <div className="social-container">
                  <a href="#" className="social">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                  <a href="#" className="social">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
                <span>or use your account</span>
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  id="login-email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  id="login-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <a href="#" className="forgot-password">
                  Forgot your password?
                </a>
                <button
                  className="submit-btn"
                  id="login-btn"
                  onClick={(e) => handleLogin(e)}
                >
                  Log In
                </button>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>
                    To keep connected with us please login with your personal
                    info
                  </p>
                  <button className="ghost" id="signIn">
                    Log In
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Boss!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <button className="ghost" id="signUp">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>

          <footer>
            <p>
              Life is easier <i className="fa fa-heart"></i> with
              <a target="_blank" href="https://florin-pop.com">
                Linked Out
              </a>
              - Search for your opportunity and join us .
            </p>
          </footer>
        </div>
      )}
      {view === "profile" && (
        <div className="profile slide-up">
          <div className="center">
            <h2 className="form-title" id="login">
              <span>and</span>Create Profile
            </h2>
            <div className="form-holder">
              <input
                type="text"
                className="input"
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                className="input"
                placeholder="Profile Picture"
                onChange={(e) => {
                  handlePic(e);
                }}
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
