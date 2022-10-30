import { Navigate } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';


import home from '../../images/home.svg';
import p1 from '../../images/p1.jpg';
import { GlobalToolBar } from "../../global";

import './getbacker.css';
import '../../global.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function GetBacker(props){
  const navigate = useNavigate();

  const loginPage = () => {
    navigate('/InterfaceDemo');
  }

  const HomePage = () =>{
    return(
      <div>
      <Carousel className = "carousel">
        <Carousel.Item className = "carousel-item">
          <img src = {p1} className = "card card--1" alt = "prod" />
        </Carousel.Item>
        <Carousel.Item className = "carousel-item">
          <img src = {p1} className = "card card--2" alt = "prod" />
        </Carousel.Item>
        <Carousel.Item className = "carousel-item">
          <img src = {p1} className = "card card--3" alt = "prod" />
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
