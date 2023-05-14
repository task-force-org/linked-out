import React,{useEffect,useState} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"
import OnePost from "./OnePost";
import Navbar from "./Navbar"
import Footer from "../components/Footer";

function AllPosts ({changeState}){
    const location = useLocation();
    const Uid= location.state.id
    useEffect(() => {
      if (location.pathname === "/companyPosts") {
        require("../css/App.css");
      }
    }, [location.pathname]);

const [data,setData]=useState([])
// const profile=location.state.data
    
const getData=()=>{
    axios.get("http://localhost:5000/company/post/All")
    .then((res)=>setData(res.data))
    .catch((err)=>console.log(err))
}
useEffect(()=>{
    getData()
  
},[])

getData()
return (
    
<div>
<Navbar/>

{
data.map((e)=>{
    
return (
    <div className="all">
    
<OnePost Uid={Uid} changeState={changeState} e={e}/>
    </div>
)
})

}
{/* <Footer/> */}
</div>
)


}

export default AllPosts