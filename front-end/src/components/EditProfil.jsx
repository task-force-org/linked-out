import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const EditProfile = (props) => {
  const [fullName, setFullName] = useState(props.user.full_name);
  const [email, setEmail] = useState(props.user.email);
  const [bio, setBio] = useState(props.user.bio);
  const [experiences, setExperiences] = useState(props.user.experiences || "");
  const [education, setEducation] = useState(props.user.education || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = {
      ...props.user,
      full_name: fullName,
      email: email,
      bio: bio,
      experiences: experiences,
      education: education,
    };
    props.handleUpdateUser(updatedUser);
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
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
            placeholder="List your experiences"
            value={experiences}
            onChange={(e) => setExperiences(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEducation">
          <Form.Label>Education</Form.Label>
          <Form.Control
            type="text"
            placeholder="List your education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditProfile;
