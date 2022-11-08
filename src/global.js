import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Add from "./components/projects/add";

import './global.css';
import logo from './images/home.png';
import METAMASK from './images/MetaMask_Fox.svg';

export const BackgroundCovered = '#282c34';
export const BackgroundUncovered = 'white';
export const MessageColorCovered = 'white';
export const MessageColorUncovered = 'black';

export const HighlightColor = 'yellow';
export const LinkColor = '#61dafb';
export const TopbarColor = '#61dafb';

export function GlobalToolBar(address){
  const linkAddress = "https://goerli.etherscan.io/address/" + address;

  return (
    <Navbar className="navBarBackground" expand='lg'>
      {/* <Navbar bg='dark' variant='dark' expand='lg' className = "navBarBackground"> */}
      <Container>
        <Navbar.Brand>
          <Link to="/InterfaceDemo/testing">
            <img src={logo} className="brand-logo" alt="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/InterfaceDemo/profile">Projects</Link>
            </Nav.Link>
          <Nav.Link>
            <Link to="/InterfaceDemo/createProject">Create Project</Link>
          </Nav.Link>
          </Nav>
          <Nav.Link>
            <Link to ="/InterfaceDemo">
            <img src={METAMASK} className="meta-logo" alt="logo" />
            </Link>
          </Nav.Link>
            <a target="_blank" href={linkAddress}>{address}</a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}


// <Link to = "/InterfaceDemo">Login</Link>
// &nbsp;|&nbsp;
// <Link to = "/InterfaceDemo/profile">Profile</Link>
// &nbsp;|&nbsp;
// <Link to = "/InterfaceDemo/getbacker">getBacker</Link>
// &nbsp;|&nbsp;
// <Link to = "/InterfaceDemo/history">History</Link>

// <Navbar bg="dark" expand="lg">
//   <Container>
//   <Navbar.Brand>
//     <Link to = "/InterfaceDemo">Login</Link>
//   </Navbar.Brand>
//   <Navbar.Toggle aria-controls="basic-navbar-nav" />
//   <Navbar.Collapse id="basic-navbar-nav">
//     <Nav className="me-auto">
//       <Nav.Link>
//         <Link to = "/InterfaceDemo/profile">Profile</Link>
//       </Nav.Link>
//       <Nav.Link>
//         <Link to = "/InterfaceDemo/getbacker">getBacker</Link>
//       </Nav.Link>
//       <Nav.Link>
//         <Link to = "/InterfaceDemo/history">History</Link>
//       </Nav.Link>
//     </Nav>
//   </Navbar.Collapse>
//   </Container>
// </Navbar>
