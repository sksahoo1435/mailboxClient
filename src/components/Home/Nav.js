import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { RiShutDownLine } from "react-icons/ri";

import { logout } from "../../store/slices/auth-slice";

const NavBar = () => {
  const dispatch = useDispatch();
  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="sm"
      fixed="top"
      style={{
        zIndex: 99,
      }}
    >
      <Container fluid>
        <Link to="/home/inbox" className="nav-link navbar-brand fw-bold">
          MAILBOX CLIENT
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex justify-content-between w-100">
            <Link
              to="/"
              variant="danger"
              className="text-light fs-3 ms-auto"
              onClick={() => {
                dispatch(logout());
              }}
            >
              <RiShutDownLine />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
