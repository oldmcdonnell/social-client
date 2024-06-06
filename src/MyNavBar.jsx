import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom"
import Logout from './Logout';


function MyNavbar() {
    return (
    <Navbar collapseOnSelect expand="lg" className='bg-body-tertiary'>
    <Navbar.Brand href="#">Art Social</Navbar.Brand>
    <Container>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto Navbar col-m-6">
            <Link className="text-black-50 px-3 navbar" to="/">Home</Link>
            <Link className="text-black-50 px-3 navbar" to="/Gallery">Gallery</Link>
            <Link className="text-black-50 px-3 navbar" to="/Posts">All Posts</Link>
            <Link className="text-black-50 px-3 navbar" to="/MyPosts">My Posts</Link>
          </Nav>
        </Navbar.Collapse>
    </Container>
    <Logout />
    </Navbar>
  );
}

export default MyNavbar;