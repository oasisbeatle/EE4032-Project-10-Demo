import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom"


import "./profile.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";
import METAMASK from '../../images/MetaMask_Fox.svg';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {useState, useRef, useEffect} from 'react';


export default function Profile(props){

  const [display, setDisplay] = useState(null);

  const handler = (event) => {
    props.updateProject(event.currentTarget.dataset.index);
  }

  function getProgress(currentVal, totalVal){
    var progress = (currentVal/totalVal) * 100;
    return progress;
  }

  const columnsPerRow = 3;


  function RenderCards(){
    const ListItems = (card, index) => {
      return(
        <Col>
        <Card key={index} className="ccard" bg="light" >
          <Card.Img variant="top" src={card.image} className="backimage" alt=" "/>
          <Card.Body className="card-body">
          <Card.Title className="card-title" > {card.title} </Card.Title>
          <br></br>
            <p></p>
            <span> Amount Raised: {getProgress(card.backingPledged, card.fundingGoal)}%</span>
            <ProgressBar variant="success" now={getProgress(card.backingPledged, card.fundingGoal)}/>
            <br></br>
              <Button data-index={card.address} onClick={handler}>
                  Go To Product
              </Button>
          </Card.Body>
        </Card>
        </Col>
      );
    };

    return(
      <div className="cardContainer">
      <Row xs={1} md={columnsPerRow} className="top-buffer">
          {props.projects.map(ListItems)}
      </Row>
      </div>
    );
  };

  return (
      <div>
          {GlobalToolBar(props.address)}
          <div>
            {
              props.isConnected ?
                <RenderCards/>:
                <Navigate to='/InterfaceDemo' />
            }
          </div>
      </div>
)
}



// {props.projects.map((project, i) => (
//     <Card style={{ width: '18rem' }}>
//         <Card.Title> {project} </Card.Title>
//     </Card>
// ))}


//     const ProfilePage = () => {
//         return (
//         <div>
//         <GlobalToolBar/>
//         <div className = "profile-background">
//             <div className = "profile">
//                 <img src = {METAMASK} alt = "logo" height = "100%"/>
//                 <div className = "profile-account">
//                     <p>
//                         <b>Profile details</b>
//                     </p>
//                     <p>
//                         Address:&nbsp;
//                         <span className = "global-message">{props.address}</span>
//                         <br/>
//                         Network:&nbsp;
//                         <span className = "global-message">{props.networkType}</span>
//                         <br/>
//                         Balance:&nbsp;
//                         <span className = "global-message">{props.balance}</span>
//                         &nbsp;ETH
//                     </p>
//                 </div>
//             </div>
//         </div>
//         </div>
//
//         )
