import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
const EditProfileCompany = (props) => {
  const [company_name, setCompany_name] = useState("");
  const [email, setEmail] = useState("");
console.log(props.data)
  const [description, setDescription] = useState("");

  const updatedUser = {
    company_name: company_name,
    email: email,
    description: description,
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onSave(updatedUser);
    patchData();
    window.location.reload();
  };

  const patchData = () => {
    axios

      .put(
        `http://localhost:5000/company/${props.data[0].idcompany}`,
        updatedUser
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="edit-profile">
      {console.log(props.data)}
      <h2>Edit Profile company</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFullName">
          <Form.Label>company_name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={props.data[0].company_name}
            onChange={(e) => setCompany_name(e.target.value)}
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

        <Form.Group controlId="formDescription">
          <Form.Label>description</Form.Label>
          <Form.Control
            type="description"
            defaultValue={props.data[0].description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button
          onClick={(event) => handleSubmit(event)}
          variant="primary"
          type="submit"
        >
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditProfileCompany;