import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
const EditProfile = (props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [experiences, setExperiences] = useState("");
  const [education, setEducation] = useState("");


  const updatedUser = {
      
    full_name: fullName,
    email: email,
    bio: bio,
    experiences: experiences,
    education: education,
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    
    props.onSave(updatedUser);
    patchData()
    window.location.reload()
  };

const patchData=()=>{
  axios
  
      .put(`http://localhost:5000/individual/${props.data[0].userID}`, updatedUser)
      .then((res) => {
      console.log(res);
      })
      .catch((err) => console.error(err));
}

  return (
    
    <div className="edit-profile">
      {console.log(props.data)}
      <h2>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control 
            type="text"
      
            defaultValue={props.data[0].full_name}  
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            defaultValue={props.data[0].email}  
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Tell us about yourself"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formExperiences">
          <Form.Label>Experiences</Form.Label>
          <Form.Control
            type="text"
            defaultValue={props.data[0].experiences}  
            onChange={(e) => setExperiences(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEducation">
          <Form.Label>Education</Form.Label>
          <Form.Control
            type="text"
            defaultValue={props.data[0].education}  
            onChange={(e) => setEducation(e.target.value)}
          />
        </Form.Group>

        <Button  onClick={(event)=>handleSubmit(event)} variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditProfile;
