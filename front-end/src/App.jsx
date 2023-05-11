import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./components/Home";
// import LoginCom from "./components/LoginCom";
// import LoginIndiv from "./components/LoginIndiv";
import AllPosts from "./components/AllPosts";
import PostDtails from "./components/PostDetails";
import Navbar from "./components/Navbar";
import "./css/App.css"
import Footer from "./components/Footer";
function App() {
  return (
    <>
    <div className="fix">
    <Navbar/>
    </div>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/individual" element={<LoginIndiv />} /> */}
        {/* <Route path="/company" element={<LoginCom />} /> */}
        <Route path="/companyPosts" element={<AllPosts />} />
        <Route path="/PostDtails" element={<PostDtails />} />
      </Routes>
    </BrowserRouter>
    <Footer/>
    </>
   
  );
}

export default App;
