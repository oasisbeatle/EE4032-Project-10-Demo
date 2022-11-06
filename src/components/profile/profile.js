import { Navigate } from "react-router-dom";

import "./profile.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";
import METAMASK from '../../images/MetaMask_Fox.svg';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';



export default function Profile(props){

  function RenderCards(){
    const ListItems = (card, index) => {
      return(
        <div>
        <Card className="card" key={index}>
          <Card.Img variant="left" src={card.image} className="backimage"/>
          <Card.Body>
          <Card.Title> {card.title} </Card.Title>
          <Card.Text> {card.description} </Card.Text>
          <br></br>
           <Button variant="primary">Go To Product</Button>
          </Card.Body>
        </Card>
        <br></br>
        </div>
      );
    };

    return(
      <div className="cardContainer">
        {props.projects.map(ListItems)}
      </div>
    );
  };

  return (
      <div className="profile-background">
        <GlobalToolBar/>
        <RenderCards/>
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
