import React, { useState } from 'react';
import axios from 'axios';
// import "./add.css"

const AddPost = ({ props }) => {
  const [post_img, setPost_img] = useState('');
  const [post_title, setPost_title] = useState('');
  const [post_description , setPost_description ] = useState('');
  const [post_date, setPost_date] = useState('');
  const [post_details , setPost_details ] = useState('');

  const handleAddPost = () => {
    const currentDate = Date.now();
    setPost_date(currentDate);
  
    // Replace `USER_ID` with the actual ID of the user creating the post
    const userID = props.userID;
  
    axios
      .post('http://localhost:5000/individual/posts', { // na9sa id of user 
        post_title: post_title,
        post_img: post_img,
        post_description: post_description,
        post_date: post_date,
        post_aplliers: 0,
        individual_userID: userID,
        post_details: post_details
      })
      .then(() => {
        // changeView('profil');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1 className='add'>Add post</h1>
      <input type="text" placeholder='Enter the Post_title' onChange={(e) => setPost_title(e.target.value)} />
      <br />
      <input type="text" placeholder='Enter the post_img' onChange={(e) => setPost_img(e.target.value)} />
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

export default AddPost;
