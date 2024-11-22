import { Link } from "react-router-dom";
import Logout from "./Logout";
import { Nav, Navbar } from "react-bootstrap";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-secondary">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span" className="align-content-center">
            <Link style={padding} className="text-white btn btn-primary" to="/">
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span" className="align-content-center">
            <Link
              style={padding}
              className="text-white btn btn-primary"
              to="/users"
            >
              users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span" className="align-content-center">
            <Logout style={padding} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
