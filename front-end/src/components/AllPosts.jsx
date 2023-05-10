import React,{useEffect,useState} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"
import OnePost from "./OnePost";
import Navbar from "./Navbar"

function AllPosts ({changeState}){

    const location = useLocation();
    useEffect(() => {
      if (location.pathname === "/companyPosts") {
        require("../css/App.css");
      }
    }, [location.pathname]);

const [data,setData]=useState([])
    
const getData=()=>{
    axios.get("http://localhost:5000/posts/companies/all")
    .then((res)=>setData(res.data))
    .catch((err)=>console.log(err))
}
useEffect(()=>{
    getData()
},[])

getData()
return (
<div>
   

{
data.map((e)=>{
    
return (
    <div className="all">
    
<OnePost changeState={changeState} e={e}/>
    </div>
)
})

}

</div>
)


}

export default AllPosts