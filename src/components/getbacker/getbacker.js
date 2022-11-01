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

import './getbacker.css';
import '../../global.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function GetBacker(props){
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

  const HomePage = () =>{
    return(
      <div>
          <br></br>
          <h1> Meet Cloudburst - The Sneaker That Can Take On Any Weather </h1>
          <img src = {p1} className = "image" alt = "prod" />
          <br></br>
          <br></br>
          <p> A 100% waterproof, high-top sneaker made for unpredictable weather | Comfort of a sneaker. Performance of a boot. </p>
          <p>Connected Account: {props.address}</p>
          <div>
              <input type="number" className="backingAmount" defaultValue={1}/>
                  <label htmlFor="donationAmount">GoerliETH</label>
                    <button onClick={props.storeValHandle} className="backing" type="button">
                      Back This Product
                    </button>
          </div>
          <br></br>
          <div>
              <button className="amount" type="button">
                        See Total Contribution Amount
              </button>
          </div>
          <br></br>
          <div>
               <button className="refund" type="button" onClick={props.withdrawVal}>
                        Request Withdrawal
               </button>
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
