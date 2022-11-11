import { Navigate } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import {ethers} from 'ethers';
import Web3 from "web3";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect } from 'react';


import home from '../../images/home.svg';
import p1 from '../../images/p1.jpg';
import p2 from '../../images/p2.png';
import p3 from '../../images/p3.png';
import { GlobalToolBar } from "../../global";

import './getbacker.css';
import '../../global.css';
import METAMASK from '../../images/MetaMask_Fox.svg';

export default function GetBacker(props){
  const navigate = useNavigate();

  const[timerText, setTimerText] = useState(null);
  // const loginPage = () => {
  //   navigate('/InterfaceDemo');
  // }


// code implemented from: https://stackoverflow.com/questions/36098913/convert-seconds-to-days-hours-minutes-and-seconds
  function getCountdown() {
    var counter = 0;
    var timeleft = props.timeLeft;

    if(timeleft <= 0){
      setTimerText("TIMER EXPIRED!");
    } else {
      setTimerText("Time left:");
    }

    function convertSeconds(seconds) {
      var d = Math.floor(seconds / (3600*24));
      var h = Math.floor(seconds % (3600*24) / 3600);
      var m = Math.floor(seconds % 3600 / 60);
      var s = Math.floor(seconds % 60);

      var days = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
      var hours = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
      var minutes = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
      var seconds = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
      return days + hours + minutes + seconds;
    }

    function setup() {
      var timer = document.getElementById("timer");
      timer.innerHTML = (convertSeconds(timeleft - counter));


      function timeIt() {
        counter++;
        timer.innerHTML = (convertSeconds(timeleft - counter));
      }
      setInterval(timeIt, 1000);
    }
    setup();
}

  const handleChangeVoteNum = event => {
    props.setVoted(event.target.value);
  };

  useEffect(() => {
    props.getMilestone(); //update screen
    if(props.milestone === '1'){
      getCountdown();
    } else {
      setTimerText('TIMER EXPIRED');
    }
  });

  const BackingStateZero = () =>{
    return(
      <div>
        <p>
            Milestone:&nbsp;
            <span className = "global-message">{props.milestone}</span>
        </p>
        <br></br>
        <div>
           <button className="btn custom-button" type="button" onClick={props.withdrawVal}>
            Refund
           </button>
        </div>
        <div>
           <button className="btn custom-button" type="button" onClick={props.getMilestone}>
            Update
           </button>
        </div>
    </div>
    )
  }

  const BackingStateOne = () =>{
      return(
        <div>
            <p>
                Milestone:&nbsp;
                <span className = "global-message">{props.milestone}</span>
            </p>
            <div>
                {/* <input type="number" className="backingAmount" defaultValue={1}/> */}
                    {/* <label htmlFor="donationAmount">GoerliETH</label> */}
                      <button onClick={props.storeValHandle} className="btn custom-button" type="button">
                        Back This Product
                      </button>
            </div>
            <br></br>
            <div>
                 <button disabled={props.disableEndBackingPhaseButton} className="btn custom-button" type="button" onClick={props.backingPhaseEndUpdate}>
                          End Backing Phase
                 </button>
            </div>
            <br></br>
            <div>
              <button className="btn custom-button" type="button" onClick={props.getMilestone}>
                          Update
              </button>
            </div>
        </div>
      )
    }

  const BackingStateAlt = () =>{
    return(
      <div>
          <p>
              Milestone:&nbsp;
              <span className = "global-message">{props.milestone}</span>
          </p>
          <div>
            <label htmlFor="Phase">Phase</label>
            <input type="number" value={props.voted} onChange={handleChangeVoteNum} className="vote"/>
            </div>
            <button onClick={props.voteHandle} className=" btn custom-button" type="button">
                      Vote
            </button>
            <br></br>
            <div>
                 <button disabled={props.disableRecountMilestoneButton} className="btn custom-button" type="button" onClick={props.recountMilestoneUpdate}>
                          Recount Milestone
                 </button>
            </div>
          <br></br>
          <div className="btn-group" role="group" aria-label="Basic example">
          <div>
               <button className="btn custom-button" type="button" onClick={props.withdrawVal}>
                        Refund
               </button>
          </div>
          <br></br>
          <div>
                <button className=" btn custom-button" type="button" onClick={props.getMilestone}>
                            Update
                </button>
          </div>
        </div>
      </div>
      )
  }

  function ChooseBackingState(props){
      if(props.milestone === '0'){
        return(<BackingStateZero/>);
      }
      else if(props.milestone === '1'){
        return(<BackingStateOne/>);
      }
      else{
        return(<BackingStateAlt/>);
      }
  }

  const HomePage = () => {
    return(
      <div>
          <br></br>
          <h1>{props.title}</h1>
          <img src = {props.image} className = "image" alt = "prod" />
          <br></br>
          <br></br>
          <p>{props.desc}</p>
          <br></br>
          <div>
            {
              <ChooseBackingState/>
             }
          </div>
      </div>
    )
  }

  const ProductPage = () => {
    return(
    <div>
      <Row xs={1} md={1}>
        <Col>
          <Card className="project-card">
            <br></br>
            <div className="align-h">
              <h4>{timerText}&nbsp;</h4>
              <h4 id='timer'></h4>
            </div>
            <br></br>
            <Card.Img variant="top" className="image" src={props.image}/>
            <Card.Body>
              <Card.Title>{props.title}</Card.Title>
              <Card.Text>{props.desc}</Card.Text>
              <ChooseBackingState/>
             </Card.Body>
           </Card>
          </Col>
         </Row>
      </div>
    )
  }

  return (
      <div className="HomePageBackground">
          {GlobalToolBar(props.address)}
      <div>
          {
              props.isConnected ?
              <ProductPage/>:
              <Navigate to = '/InterfaceDemo' />
          }
      </div>
      </div>
  )

}
