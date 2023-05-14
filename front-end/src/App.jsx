import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import LoginCom from "./components/home/LoginCom";
import LoginIndiv from "./components/home/LoginIndiv";
import AllPosts from "./components/AllPosts";
import PostDtails from "./components/PostDetails";
import UserDetails from "./components/individual/UserDetails";
import CompanyDetails from "./components/company/CompanyDetails";
import SeeAppliers from "./components/SeeAppliers";
import AddPostCompany from "./components/company/AddPostCompany";
// import ProfileDetails from "./components/ProfileDetails";

function App() {
  return (
    <>
      <div className="fix"></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/indiv" element={<LoginIndiv />} />
          <Route path="/company" element={<LoginCom />} />
          <Route path="/companyPosts" element={<AllPosts />} />
          <Route path="/PostDtails" element={<PostDtails />} />
          <Route path="/companyDetails" element={<CompanyDetails />} />
          <Route path="/userProfile" element={<UserDetails />} />
          <Route path="/SeeAppliers" element={<SeeAppliers />} />
          <Route path="/addpostCompony" element={<AddPostCompany />} />
          {/* <Route path="/ProfileDetails" element={<ProfileDetails />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
