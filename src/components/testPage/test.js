import React from "react";
import { GlobalToolBar } from "../../global";
import "../../global.css";
import "./test.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import Backed from '../../images/backed.png';
import Projects from '../../images/projects.png';
import ETH from '../../images/eth.png';
import LEAF from '../../images/leaf.png';


export default function Testing(props) {
  const Navigate = useNavigate();

      const handler = (event) => {
        Navigate('../InterfaceDemo/CreateProject');
      }

  function conversion(num){
    const x = Math.pow(10,18);
    num = num/(x);
    return num;
  }

  const InfoCards = () => {
      return (
        <div className="card-container">
        <Row xs={1} md={3}>
        <Col>
          <Card className="info-card">
            <Card.Img variant="top" src={Projects} className="image-logo"/>
            <Card.Body>
              <Card.Title>Projects</Card.Title>
              <br></br>
              <Card.Text><h4>{props.totalProjects}</h4></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="info-card">
            <Card.Img variant="top" src={Backed} className="image-logo"/>
            <Card.Body>
              <Card.Title>Backed</Card.Title>
              <br></br>
              <Card.Text><h4>{props.totalBackers}</h4></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="info-card">
            <Card.Img variant="top" src={ETH} className="image-logo" />
            <Card.Body>
              <Card.Title>Contributed</Card.Title>
              <br></br>
              <Card.Text><h4>{conversion(props.totalAmountBacked)} ETH </h4></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        </Row>
        </div>
        )
      }

      const AddProject = () => {
        return(
          <div className="button-container">
            <Button className="add-button" variant="light" onClick={handler}>
                Add Project
            </Button>
          </div>
        )
      }

    const HeroBanner = () => {
      return(
        <div className="hero-banner">
            <img src={LEAF} className="leaf-logo"/>
            <h2> In Crowdfunding, We Trust</h2>
            <h1> GET BACKER. </h1>
            <br></br>
          <InfoCards/>
          <AddProject/>
        </div>
      )
    }


    return(
        <div>
          {GlobalToolBar(props.address)}
          <div>
            {
              props.isConnected ?
                <HeroBanner/>:
                <Navigate to='/InterfaceDemo' />
            }
          </div>
        </div>
    )
}
