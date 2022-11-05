import { Navigate } from "react-router-dom";

import "./profile.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";
import METAMASK from '../../images/MetaMask_Fox.svg';
import Card from 'react-bootstrap/Card';



export default function Profile(props){
  return (
      <div>
          <GlobalToolBar/>
          <div>
            {props.projects.map((project, i) => (
                <Card style={{ width: '18rem' }}>
                    <Card.Title> {project} </Card.Title>
                </Card>
            ))}
          </div>
      </div>

  )
}




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
