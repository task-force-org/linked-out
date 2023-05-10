import React, { useState } from 'react';
import axios from 'axios';
import "./add.css"

const AddPost = ({ changeView }) => {
  const [post_img, setPost_img] = useState('');
  const [post_title, setPost_title] = useState('');
  const [post_description , setPost_description ] = useState('');

  const handleAddPost = () => {
    axios
      .post('http://localhost:5000/users/posts', { post_img, post_title, post_description })
      .then(() => {
        changeView('profil');
      })
      .catch((err) => {
        console.log(err);
      });
      window.location.reload()
  };

  return (
    <>
      <h1 className='add'>Add Haircut</h1>
      <input type="text" placeholder='Enter the Post_title' onChange={(e) => setPost_title(e.target.value)} />
      <br />
      <input type="text" placeholder='Enter the post_img' onChange={(e) => setPost_img(e.target.value)} />
      <br />
      <input type="text" placeholder='Enter the post_description' onChange={(e) => setPost_description(e.target.value)} />
      <br />
      <button className='button' type='submit' onClick={
        handleAddPost
        }>Submit</button>
    </>
  );
};

export default AddPost;