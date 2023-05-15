import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SeeAppliers() {
  const location = useLocation();

  const reload = () => {
    window.location.reload();
    window.history.back();
  };
  useEffect(() => {
    if (location.pathname === "/SeeAppliers") {
      require("./css/Appliers.css");
      require("./css/login.css");
    }
  }, [location.pathname]);

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
    return (
      <>
        <h1>no appliers for the time being</h1>
        <button onClick={() => reload()}>back</button>
      </>
    );
  } else if (data !== [])
    return (
      <>
        {data.map((e) => {
          return (
            <div class="row row-cols-1 row-cols-md-2 g-4">
              <div class="col">
                <div class="card">
                  <img src={e.profile_pic} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">{e.full_name}</h5>
                    <p class="card-text">bio: {e.bio}</p>
                    <p class="card-text">Experiences: {e.experiences}</p>
                    <p class="card-text">Education: {e.education}</p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">Email: {e.email}</small>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <button onClick={() => reload()}>back</button>
      </>
    );
}

export default SeeAppliers;
