import React, { useState } from "react";
import { Form, Divider, Input, Typography, Button } from "antd";
// import auth from "./firebase";
import "./passengerinput.css";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltDown } from "react-icons/fa";
import { Alert } from "react-bootstrap";
import Sodi2 from "../mapsinput/logic";
import { InputGroup } from "react-bootstrap";

export const Passengerinput = () => {
  const [message, setmessage] = useState({ error: false, msg: "" });
  const navigate = useNavigate();
  const navtomapinit = () => {
    navigate("/mapinit");
  };
  const navtomapfin = () => {
    navigate("/mapfin");
  };
  const navtojoinride = () => {
    if (
      !sessionStorage.getItem("initpointclass") ||
      !sessionStorage.getItem("finpoint")
    ) {
      setmessage({ error: true, msg: "Select both points on the map" });
      return;
    }
    const appu1 = sessionStorage.getItem("initpoint");
    const appu2 = sessionStorage.getItem("finpoint");
    const taxinum = Sodi2({ appu: appu1, yashita: appu2 });
    sessionStorage.setItem("selectedwayno", taxinum);
    console.log(taxinum);
    navigate("/join");
  };
  return (
    <div>
      {message?.msg && (
        <Alert
          variant={message?.error ? "danger" : "success"}
          dismissible
          onClose={() => setmessage("")}
        >
          {message?.msg}
        </Alert>
      )}
      <div class="okati">
      <Form className="pass">
        {/* <Form.Group> */}
          {/* <InputGroup> */}
          <Form.Item class="form-item">
            <div class="input-group">
            <Input
              className="input"
              //placeholder="Enter Pick-up location"
              value={
                sessionStorage.getItem("initpointclass")
                  ? sessionStorage.getItem("initpointclass")
                  : ""
              }
            />
            <button class="logbuttu"onClick={navtomapinit}>Select Initial Point</button>
            </div>
            </Form.Item>
          {/* </InputGroup> */}
        {/* </Form.Group> */}
        {/* <h3 className="arrow">
            <FaLongArrowAltDown />
          </h3>
          */}
        <Form.Item class="form-input">
        <div class="input-group">
          <Input
            className="input"
            //placeholder="Enter Destination location"
            value={
              sessionStorage.getItem("finpointclass")
                ? sessionStorage.getItem("finpointclass")
                : ""
            }
          />
          <button class="logbuttu"onClick={navtomapfin}>Select Destination</button>
         </div>
        </Form.Item>
        
        <button class="logbuttubro"onClick={navtojoinride}>Search For Rides</button>
        <br />
        <br />
      </Form>
      </div>
    </div>
  );
};
