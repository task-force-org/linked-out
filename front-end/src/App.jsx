import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginCom from "./components/LoginCom";
import LoginIndiv from "./components/LoginIndiv";
import AllPosts from "./components/AllPosts";
import PostDtails from "./components/PostDetails";
import UserDetails from "./components/UserDetails";
import "./css/App.css"
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CompanyDetails from "./components/CompanyDetails";
import AddPost from "./components/AddPost";
import SeeAppliers from "./components/SeeAppliers"
import AddPostCompany from "./components/AddPostCompany";

function App() {
  return (
    <>
    <div className="fix">
    
    </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/indiv" element={<LoginIndiv />} />
        <Route path="/company" element={<LoginCom />} />
        <Route path="/companyPosts" element={<AllPosts />} />
        <Route path="/PostDtails" element={<PostDtails />} />
        <Route path="/companyDetails" element={<CompanyDetails />} />
        <Route path="/userProfile" element={<UserDetails />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/SeeAppliers" element={<SeeAppliers />} />
        <Route path="/addpostCompony" element={<AddPostCompany />} />
      </Routes>
    </BrowserRouter>
 
    </>
   
  );
}

export default App;
