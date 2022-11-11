import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge'
import Card from'react-bootstrap/Card'
import { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_BYTECODE, LIST_CONTRACT_ADDRESS } from "../../contracts/config";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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

  const deployContract = (provider, address, getProjects) => {
    document.getElementById("deployForm").reset();
    setPageState(1);
    (async function () {
      try {
        var factory = new ethers.ContractFactory(CONTRACT_ABI, CONTRACT_BYTECODE.object, provider.getSigner());
        let contract = await factory.deploy(ethers.BigNumber.from(time), address, ethers.BigNumber.from(val), ethers.BigNumber.from(5), ethers.BigNumber.from(tot), title, description, URL, ethers.BigNumber.from(per1), ethers.BigNumber.from(per2), ethers.BigNumber.from(100), LIST_CONTRACT_ADDRESS);
        console.log(contract);
        setPageState(2);
        getProjects();
      } catch (err) {
        setPageState(3);
        console.log(err);
      }
    })();
  }

  if (pageState == 0) {
    return (
      <div>
      {
          <Row xs={1} md={1}>
            <Col>
              <Card className="width-custom form-card">
                <Card.Body className="width-custom">
                  <Card.Title> <h1>Create A Crowd Funding Project.</h1> </Card.Title>
                  <br></br>
                  <Card.Text className="width-custom">
                  <form id="deployForm" onSubmit={handleSubmit} className="width-custom">

                  <div className="width-custom">
                      <label className= "width-custom">
                        <h5 class="card-title" style ={{color: "black"}}>Title</h5>
                        <br></br>
                        <input type="text" class="form-control custom-form" name="title" value={title} onChange={(e) => { setTitle(e.target.value) }}/>
                      </label>
                  </div>

                  <br></br>


                  <div className="width-custom">
                    <label className="width-custom">
                      <h5 class="card-title" style ={{color: "black"}}>Description</h5>
                      <br></br>
                      <textarea type="text" class="form-control desc" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </label>
                  </div>

                  <br></br>

                  <div className="width-custom">
                    <label className="width-custom">
                      <h5 class="card-title" style ={{color: "black"}}>Image URL</h5>
                      <br></br>
                      <input type="text" class="form-control" name="image" value={URL} onChange={(e) => setURL(e.target.value)}/>
                    </label>
                  </div>

                  <br></br>

                  <div>
                    <label>
                      <h5 class="card-title" style ={{color: "black"}}>Backing Time(In Seconds)</h5>
                      <br></br>
                      <input type="number" class="form-control width-fixed margin-custom" name="time" value={time} onChange={(e) => setTime(e.target.value)}/>
                    </label>
                  </div>

                  <br></br>

                  <div>
                    <label>
                      <h5 class="card-title" style ={{color: "black"}}>Backer Value(In Wei)</h5>
                      <br></br>
                      <input type="number" class="form-control width-fixed margin-custom" name="val" value={val} onChange={(e) => setVal(e.target.value)}/>
                    </label>
                  </div>

                  <br></br>

                  <div>
                    <label>
                      <h5 class="card-title" style ={{color: "black"}}>Total Backing Required(In Wei)</h5>
                      <br></br>
                      <input type="number" class="form-control width-fixed margin-c1" name="tot" value={tot} onChange={(e) => setTot(e.target.value)}/>
                    </label>
                  </div>

                  <br></br>

                  <div>
                    <label>
                      <h5 class="card-title" style ={{color: "black"}}>First Milestone Payout Percentage(in %)</h5>
                      <br></br>
                      <input type="number" name="p1" placeholder="Example: 45" class="form-control width-fixed margin-c2"value={per1} onChange={(e) => setPer1(e.target.value)}/>
                    </label>
                  </div>

                  <br></br>

                  <div>
                    <label>
                      <h5 class="card-title" style ={{color: "black"}}>Second Milestone Payout Percentage(in %)</h5>
                      <br></br>
                      <input type="number" placeholder="Example: 5" class="form-control width-fixed margin-c3"name="p2" value={per2} onChange={(e) => setPer2(e.target.value)}/>
                    </label>
                  </div>

                  </form>
                  </Card.Text>
                  <br></br>
                  <Button variant="primary" className='submit-button' onClick={() => { deployContract(props.provider, props.address, props.getProjects)}}>Create Project</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
         }
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
      {GlobalToolBar(props.address)}
      <div>
        {
          props.isConnected ?
            <HomePage provider={props.provider}
              address={props.address}
              getProjects={props.getProjects} /> :
            <Navigate to='/InterfaceDemo' />
        }
      </div>
    </div>
  )

}
