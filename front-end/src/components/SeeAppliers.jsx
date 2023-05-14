import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EditProfile from "./company/EditProfileCompany";
import "bootstrap/dist/css/bootstrap.css";

import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBCardFooter,
} from "mdb-react-ui-kit";

function SeeAppliers() {
  const location = useLocation();
  const id = location.state.idP["idposts-company"];
  console.log(id, "idp");
  const [data, setData] = useState([]);

  const getAppliers = () => {
    axios
      .get(`http://localhost:5000/app/applications/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(id, "ID"));
  };
  useEffect(() => {
    getAppliers();
  }, []);
  if (!data[0]) {
    console.log(data, "data");
    return <h1>no appliers for the time being</h1>;
  } else if (data !== [])
    return (
      <>
        {data.map((e) => {
          return (
            <>
              <MDBRow className="row-cols-1 row-cols-md-2 g-4">
                <MDBCol>
                  <MDBCard>
                    <MDBCardImage
                      src={e.profile_pic}
                      alt="..."
                      position="top"
                    />
                    <MDBCardBody>
                      <MDBCardTitle>{e.full_name}</MDBCardTitle>
                      <MDBCardText>bio:{e.bio}</MDBCardText>
                      <MDBCardText>Experiences:{e.experiences}</MDBCardText>
                      <MDBCardText>Education:{e.education}</MDBCardText>
                    </MDBCardBody>
                    <MDBCardFooter>
                      <small className="text-muted"> Email:{e.email}</small>
                    </MDBCardFooter>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </>
          );
        })}
      </>
    );
}

export default SeeAppliers;
