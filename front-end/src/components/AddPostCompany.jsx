import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import moment from 'moment';
const AddPostCompany = () => {
  const [post_img, setPost_img] = useState('');
  const [post_title, setPost_title] = useState('');
  const [post_description , setPost_description ] = useState('');
  const [posts_details , setPost_details ] = useState('');
  const navigate=useNavigate()
  const location=useLocation()
  const id= location.state.ids
 

console.log(id,"add")
  const handlePic = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      setPost_img(reader.result);
    };
  };
  const handleAddPost = () => {

    // Replace USER_ID with the actual ID of the user creating the post
   

    axios
      .post(`http://localhost:5000/company/post/${id}`, { 
        post_title: post_title,
        post_img: post_img,
        post_description: post_description,
        post_date: moment().format('MMMM Do YYYY, h:mm a'),
        post_aplliers: 0,
        company_idcompany: id,
        posts_details: posts_details
      })
      .then(() => {
        window.history.back()
       
      })
      .catch((err) => {
        console.log(err);
      });
     
  };

  return (
    <>
      <h1 className='add'>Add post company</h1>
      <input type="text" placeholder='Enter the Post_title' onChange={(e) => setPost_title(e.target.value)} />
      <br />
      <input type="file" placeholder='Enter the post_img' onChange={(e) => handlePic(e)} />
      <br />
      <input type="text" placeholder='Enter the post_description' onChange={(e) => setPost_description(e.target.value)} />
      <br />
      <input type="text" placeholder='Enter the post_details' onChange={(e) => setPost_details(e.target.value)} />
      <br />
      <button className='button' type='submit' onClick={
        handleAddPost
        }>Submit</button>
    </>
  );
};

export default AddPostCompany;