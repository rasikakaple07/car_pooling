import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../authentication/firebase";
// import Popup from "reactjs-popup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./header.css";

const HeaderDrive = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //auth
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signout successful");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  //auth ends
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/addride">
            <h3>CARPOOLING</h3>
          </Navbar.Brand>
          <Nav className="ml-auto justify-content-end">
            <Nav.Link
              as={Link}
              to="/addride"
              style={{ fontSize: "20px", color: "white" }}
              className={`nav-link-spacer ${
                location.pathname === "/addride" ? "in-that-page" : ""
              }`}
            >
              New Ride{" "}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/acceptride"
              style={{ fontSize: "20px", color: "white" }}
              className={`nav-link-spacer ${
                location.pathname === "/acceptride" ? "in-that-page" : ""
              }`}
            >
              MyRide
            </Nav.Link>
            {/* pop over */}
            <button  className="signout-button" onClick={userSignOut}>Sign Out</button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderDrive;
