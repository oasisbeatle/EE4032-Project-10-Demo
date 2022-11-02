import { Navigate } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge'


import home from '../../images/home.svg';
import p1 from '../../images/p1.jpg';
import p2 from '../../images/p2.png';
import p3 from '../../images/p3.png';
import { GlobalToolBar } from "../../global";

import './createProject.css';
import '../../global.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function CreateProject(props){
  const navigate = useNavigate();

  const loginPage = () => {
    navigate('/InterfaceDemo');
  }

  function BackDisplay(){
      return <Button variant="primary" onClick={props.storeValHandle}>Back Project</Button>;
  }

  function WithdrawDisplay (){
      return  <Button variant="danger">Withdraw</Button>;
  }

  const handleChangeVoteNum = event => {
    props.setVoted(event.target.value);
  };

  const HomePage = () =>{
    return(
      <div>
          <br></br>
          <h1> Create A CrowdFunding Project </h1>
          <br></br>
          <div>
            <p>Title: </p>
            <input type="text" name="title" />
          </div>
          <br></br>
          <div>
            <p>Description: </p>
            <input type="text" name="description" />
          </div>
          <br></br>
          <div>
            <p>Image: </p>
            <input type="text" name="image" />
          </div>
      </div>
    )
  }

const carousel = () =>{
  return(
    <div>
    <Carousel className = "carousel" interval={null}>
      <Carousel.Item className = "carousel-item">
        <img src = {p1} className = "card card--1" alt = "prod" />
        <Carousel.Caption>
              <h1> <BackDisplay/></h1>
              <p> <WithdrawDisplay/></p>
              <p> <Badge bg="light" text="dark">Backing Amount: </Badge></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className = "carousel-item">
        <img src = {p2} className = "card card--2" alt = "prod" />
        <Carousel.Caption>
          <h1> <BackDisplay/></h1>
          <p> <WithdrawDisplay/></p>
          <p> <Badge bg="light" text="dark">Backing Amount: </Badge></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className = "carousel-item">
        <img src = {p3} className = "card card--3" alt = "prod" />
        <Carousel.Caption>
          <h1> <BackDisplay/></h1>
          <p> <WithdrawDisplay/></p>
          <p> <Badge bg="light" text="dark">Backing Amount: </Badge></p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

  return (
      <div>
          <GlobalToolBar/>
      <div>
          {
              props.isConnected ?
              <HomePage/>:
              <Navigate to = '/InterfaceDemo' />
          }
      </div>
      </div>
  )

}
