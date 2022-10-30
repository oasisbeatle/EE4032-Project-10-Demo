import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './global.css';
import logo from './images/logo.svg';

export const BackgroundCovered = '#282c34';
export const BackgroundUncovered = 'white';
export const MessageColorCovered = 'white';
export const MessageColorUncovered = 'black';

export const HighlightColor = 'yellow';
export const LinkColor = '#61dafb';
export const TopbarColor = '#61dafb';

export const GlobalToolBar = () => {
    return (
      <Navbar bg='light' variant='light' expand='lg'>
        <Container>
        <Navbar.Brand>
          <Link to = "/InterfaceDemo">
            <img src = {logo} className = "login-logo" alt = "logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to = "/InterfaceDemo/profile">Profile</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to = "/InterfaceDemo/getbacker">Get Backer</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to = "/InterfaceDemo/history">History</Link>
            </Nav.Link>
          </Nav>
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
