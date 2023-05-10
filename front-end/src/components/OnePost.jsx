import React,{useEffect,useState} from "react";
import {useNavigate} from 'react-router-dom'
import "../onePost.css"
import "bootstrap/dist/css/bootstrap.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';





function OnePost({e}){
  const navigate=useNavigate()
    return (
        <div className="card">
            
            <Card style={{ width: '40rem' }}>
           
      <Card.Body>{e.company_name}</Card.Body>
      <img  className="img" src={e.img} />
      <p>{e.post_date}</p> 
    </Card>
        <Card style={{ width: '40rem' }}>
          <Card.Img  variant="top" src={e.post_img}/>
          <Card.Body>
            <Card.Title>{e.post_title}</Card.Title>
            <Card.Text>
              {e.post_description}
            </Card.Text>
            <Button onClick={(event)=>navigate("/PostDtails", { state: { data: e } }) } variant="primary">Check details</Button>
          </Card.Body>
        </Card>
        </div>
      );
}

export default OnePost