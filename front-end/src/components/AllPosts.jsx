import React,{useEffect,useState} from "react";
import axios from "axios"
import OnePost from "./OnePost";

function AllPosts ({changeState}){
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
    
return <OnePost changeState={changeState} e={e}/>
})

}

</div>
)


}

export default AllPosts