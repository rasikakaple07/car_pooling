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

const Headerpass = () => {
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

  //auth ends

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signout successful");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/join">
            CARPOOLING
          </Navbar.Brand>
          <Nav >
            <Nav.Link class="avikindaki"
              as={Link}
              to="/passinput"
              style={{ fontSize: "20px", color: "white" }}
              className={`nav-link-spacer ${
                location.pathname === "/passinput" ? "in-that-page" : ""
              }`}
            >
              Join new Ride
            </Nav.Link>
            <Nav.Link class="avikindaki"
              as={Link}
              to="/joinedlist"
              style={{ fontSize: "20px", color: "white" }}
              className={`nav-link-spacer ${
                location.pathname === "/joinedlist" ? "in-that-page" : ""
              }`}
            >
              MyRides
            </Nav.Link>
            <button className="signout-button" onClick={userSignOut}>Sign Out</button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Headerpass;
