import React from "react";
import { Button } from "react-bootstrap";

const CheckDetails = (props) => {
 
  return (
    <div>
      <h1>Post Details</h1>
      <h3>{props.post_title}</h3>
      <p>{props.post_img}</p>
      <p>{props.post_details}</p>
      <p>description : {props.post_description}</p>
      <p>Date: {props.post_date}</p>
      {/* <Button variant="secondary" onClick={handleClick}>
      Back to Profile
    </Button> */}
    </div>
  );
};

export default CheckDetails;