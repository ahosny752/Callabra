import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/esm/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/esm/Nav';
import {
  useParams,
} from 'react-router-dom';
import logoutUser from '../util/helperFunctions';
import { UserProfileContext } from '../contexts/UserProfileContext';

const Header = () => {
  const [profile] = useContext(UserProfileContext);
  const { handle } = profile;

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">JamSesh</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/* <Nav.Link href="#pricing">Create a post</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown> */}
          </Nav>
          <Nav>
            <Nav.Link href={`/${handle}`}>Profile</Nav.Link>
            <Nav.Link onClick={logoutUser}>
              Log out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
