import React, { useState } from "react";
import auth from "./firebase";
import "./signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Form, Divider, Button, Typography, Input } from "antd";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signUp = (e) => {
    //to do the sign-up
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/choose");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Navtosignin = () => {
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar">CARPOOLING</nav>
      <form onSubmit={signUp}>
        <h1 className="fant">SIGN UP</h1>
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
          Sign Up
        </button>
        <Divider style={{ borderColor: "white", color: "white" }}>
          Already have an account
        </Divider>
        <button type="submit" className="logbutt" onClick={Navtosignin}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignUp;
