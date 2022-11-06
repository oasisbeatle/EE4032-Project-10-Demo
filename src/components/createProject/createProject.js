import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge'
import { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_BYTECODE, LIST_CONTRACT_ADDRESS } from "../../contracts/config";


import home from '../../images/home.svg';
import p1 from '../../images/p1.jpg';
import p2 from '../../images/p2.png';
import p3 from '../../images/p3.png';
import { GlobalToolBar } from "../../global";

import './createProject.css';
import '../../global.css';
import 'bootstrap/dist/css/bootstrap.css';

function HomePage(props) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [URL, setURL] = useState("");
  const [time, setTime] = useState("");
  const [val, setVal] = useState("");
  const [tot, setTot] = useState("");
  const [per1, setPer1] = useState("");
  const [per2, setPer2] = useState("");

  const [pageState, setPageState] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const deployContract = (provider, address) => {
    document.getElementById("deployForm").reset();
    setPageState(1);
    (async function () {
      try {
        var factory = new ethers.ContractFactory(CONTRACT_ABI, CONTRACT_BYTECODE.object, provider.getSigner());
        let contract = await factory.deploy(ethers.BigNumber.from(time), address, ethers.BigNumber.from(val), ethers.BigNumber.from(5), ethers.BigNumber.from(tot), title, description, URL, ethers.BigNumber.from(per1), ethers.BigNumber.from(per2), ethers.BigNumber.from(100), LIST_CONTRACT_ADDRESS);
        console.log(contract);
        setPageState(2);
      } catch (err) {
        setPageState(3);
        console.log(err);
      }
    })();
  }

  if (pageState == 0) {
    return (
      <div className="createProjectBackground">
        <br></br>
        <h1> Create A CrowdFunding Project </h1>
        <br></br>
        <form id="deployForm" onSubmit={handleSubmit}>
          <div class="form-group s">
            <label>
              <div className="card_container">
              <h5 class="card-title" style ={{color: "black"}}>Title</h5>
              </div>
              <br></br>
              <input type="text" class="form-control" name="title" value={title} onChange={(e) => { setTitle(e.target.value) }} style={{ width: "800px" }} />
            </label>
          </div>
          <br></br>
          <div class="form-group s">
            <label>
            <div className="card_container">
              <h5 class="card-title" style ={{color: "black"}}>Description</h5>
              </div>
            <br></br>
              <textarea type="text" class="form-control" name="description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "800px", height: "400px" }} />
            </label>
          </div>
          <br></br>
          <div class="form-group s">
            <label>
            <div className="card_container">
              <h5 class="card-title" style ={{color: "black"}}>Image URL</h5>
              </div>
              <br></br>
              <input type="text" class="form-control" name="image" value={URL} onChange={(e) => setURL(e.target.value)} style={{ width: "800px" }} />
            </label>
          </div>
          <br></br>
          <div class="form-group s">
            <label>
            <div className="card_container">
              <h5 class="card-title" style ={{color: "black"}}>Backing Time(In Seconds)</h5>
              </div>
              <br></br>
              <input type="number" class="form-control" name="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ width: "800px" }} />
            </label>
          </div>
          <br></br>
          <div class="form-group s">
            <label>
            <div className="card_container">
              <h5 class="card-title" style ={{color: "black"}}>Backer Value(In Wei)</h5>
              </div>
              <br></br>
              <input type="number" class="form-control" name="val" value={val} onChange={(e) => setVal(e.target.value)} style={{ width: "800px" }} />
            </label>
          </div>
          <br></br>
          <div class="form-group s">
            <label>
            <div className="card_container">
              <h5 class="card-title" style ={{color: "black"}}>Total Backing Required(In Wei)</h5>
              </div>
              <br></br>
              <input type="number" class="form control" name="tot" value={tot} onChange={(e) => setTot(e.target.value)} style={{ width: "800px" }} />
            </label>
          </div>
          <br></br>
          <div class="form-group s">
            <label>
            <div className="card_container">
              <h5 class="card-title" style ={{color: "black"}}>First Milestone Payout Percentage(in %)</h5>
              </div>
              <br></br>
              <input type="number" name="p1" placeholder="Example: 45" class="form-control" value={per1} onChange={(e) => setPer1(e.target.value)} style={{ width: "800px" }} />
            </label>
          </div>
          <br></br>
          <div class="form-group s">
            <label>
            <div className="card_container">
              <h5 class="card-title" style ={{color: "black"}}>Second Milestone Payout Percentage(in %)</h5>
              </div>
              <br></br>
              <input type="number" placeholder="Example: 5" class="form control" name="p2" value={per2} onChange={(e) => setPer2(e.target.value)} style={{ width: "800px" }} />
            </label>
          </div>
          <br></br>
        </form>

        <button className=" btn btn-info me-2 createProject" type="button" onClick={() => { deployContract(props.provider, props.address) }}>
          Create Project
        </button>
      </div>
    )
  } else if (pageState == 1) {
    return (<div>Transaction is being processed, please be patient, do not close the page.</div>)
  } else if (pageState == 2) {
    return (<div>Project has been uploaded successfully</div>)
  } else if (pageState == 3) {
    return (<div>An error has occured, please try again.<br></br>
      <button className="retry" type="button" onClick={() => { setPageState(0) }}>
        Retry
      </button>
    </div>)
  }
}

export default function CreateProject(props) {
  const navigate = useNavigate();


  return (
    <div>
      <GlobalToolBar />
      <div>
        {
          props.isConnected ?
            <HomePage provider={props.provider}
              address={props.address} /> :
            <Navigate to='/InterfaceDemo' />
        }
      </div>
    </div>
  )

}
