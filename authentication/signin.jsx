import React, { useState } from "react";
import auth from "./firebase";
import { Form, Divider, Button, Typography, Input } from "antd";
import "./signin.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const SignIn = ({ appu, setappu }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = (e) => {
    //to do the sign-in
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setappu(email);
        let myemail = email;
        sessionStorage.setItem("email", myemail);
        console.log(sessionStorage.getItem("email"));
        console.log(appu);
        navigate("/choose");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate();
  const Navtosignup = () => {
    navigate("/signup");
  };
  return (
    <div>
      <nav className="navbar">
        CARPOOLING
      </nav>
      <form onSubmit={signIn}>
        {/* <Typography.Title className="fant">
          SIGN IN
        </Typography.Title> */}
        <h1 className="fant">SIGN IN</h1>
        <Form.Item>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <button type="submit" className="logbutt">
          Log in
        </button>
        <Divider style={{ borderColor: "white" ,color:"white" }}>
          Don't have an account
        </Divider>
        <button type="submit" className="logbutt" onClick={Navtosignup}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignIn;
