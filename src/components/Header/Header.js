import React, { useContext } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <Navbar expand="lg" className="px-3 bg-purple">
      <Navbar.Brand href="/" className="nav-link text-white">Express Tickets</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-white" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end px-3">
        <Nav className="text-right">
          <div className="px-1"><Link to="/" className="nav-link text-white">Home</Link></div>
          <div className="px-1"><Link to="/destination" className="nav-link text-white">Destination</Link></div>
          {
            loggedInUser.name ? <div className="px-1 text-white my-auto"><div>{loggedInUser.name}</div></div> :
            <div className="px-1"><Link to="/login"><Button variant="success">Login</Button></Link></div>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;