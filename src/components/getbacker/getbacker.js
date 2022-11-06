import { Navigate } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import {ethers} from 'ethers';
import Web3 from "web3";



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

  // const loginPage = () => {
  //   navigate('/InterfaceDemo');
  // }

  const handleChangeVoteNum = event => {
    props.setVoted(event.target.value);
  };

  const BackingStateZero = () =>{
    return(
      <div>
        <p>
            Milestone:&nbsp;
            <span className = "global-message">{props.milestone}</span>
        </p>
        <br></br>
        <div>
           <button className="refund" type="button" onClick={props.withdrawVal}>
            Refund
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
                      <button onClick={props.storeValHandle} className="backing" type="button">
                        Back This Product
                      </button>
            </div>
            <br></br>
            <div>
                 <button className="endBackingPhase" type="button" onClick={props.backingPhaseEndUpdate}>
                          End Backing Phase
                 </button>
            </div>
            <br></br>
            <div>
                 <button className="recountMilestone" type="button" onClick={props.recountMilestoneUpdate}>
                          Recount Milestone
                 </button>
            </div>
            <br></br>
            <div>
              <button className="refund" type="button" onClick={props.getMilestone}>
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
            <button onClick={props.voteHandle} className=" btn btn-info me-2 voteButton" type="button">
                      Vote
            </button>
          <br></br>
          <div class="btn-group" role="group" aria-label="Basic example">
          <div>
               <button className=" btn btn-info me-2 refund " type="button" onClick={props.withdrawVal}>
                        Refund
               </button>
          </div>
          <br></br>
          <div>
                <button className=" btn btn-info me-2 refund" type="button" onClick={props.getMilestone}>
                            Update
                </button>
          </div>
        </div>
      </div>
      )
  }

  function ChooseBackingState(){
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
          {/* <div class="table">
            <ul id="horizontal-list">
              <li>
                <span className = "global-message">Projects</span>
                <span className = "global-message">1</span>
                <br></br>
              </li>
              <li>
                <span className = "global-message">Backing</span>
                <span className = "global-message">1</span>
                <br></br>
              </li>
              <li>
                <span className = "global-message">Donated</span>
                <span className = "global-message">{props.address} ETH</span>
                <br></br>
              </li>
            </ul>
          </div> */}
          <br></br>
          <h1>{props.title}</h1>
          <img src = {props.image} className = "image" alt = "prod" />
          <br></br>
          <br></br>
          <p>{props.desc}</p>
          <p>Connected Account: {props.address}</p>
          <br></br>
          <div>
            {
              <ChooseBackingState/>
             }
          </div>
      </div>
    )
  }


//   const carousel = () =>{
//     return(
//       <div>
//         <Carousel className = "carousel" interval={null}>
//           <Carousel.Item className = "carousel-item">
//             <img src = {p1} className = "card card--1" alt = "prod" />
//             <Carousel.Caption>
//                   <h1> <BackDisplay/></h1>
//                   <p> <WithdrawDisplay/></p>
//                   <p> <Badge bg="light" text="dark">Backing Amount: </Badge></p>
//             </Carousel.Caption>
//           </Carousel.Item>
//           <Carousel.Item className = "carousel-item">
//             <img src = {p2} className = "card card--2" alt = "prod" />
//             <Carousel.Caption>
//               <h1> <BackDisplay/></h1>
//               <p> <WithdrawDisplay/></p>
//               <p> <Badge bg="light" text="dark">Backing Amount: </Badge></p>
//             </Carousel.Caption>
//           </Carousel.Item>
//           <Carousel.Item className = "carousel-item">
//             <img src = {p3} className = "card card--3" alt = "prod" />
//             <Carousel.Caption>
//               <h1> <BackDisplay/></h1>
//               <p> <WithdrawDisplay/></p>
//               <p> <Badge bg="light" text="dark">Backing Amount: </Badge></p>
//             </Carousel.Caption>
//           </Carousel.Item>
//         </Carousel>
//       </div>
//   )
// }

  return (
      <div className="HomePageBackground">
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
