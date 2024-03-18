import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../authentication/firebase";
import "./addingride.css";
// import RideDataService from "./ride-services";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../authentication/firebase";
import { useNavigate } from "react-router-dom";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";

const InitiateRide = () => {
  const navigate = useNavigate();
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

  const [startride, setstartride] = useState({
    carmodel: "",
    nooftravellers: undefined,
    fareperperson: undefined,
    waynumber: undefined,
    timeofstart: { hours: 9, minutes: 0 },
  });

  const [message, setmessage] = useState({ error: false, msg: "" });

  const addride = async (e) => {
    e.preventDefault();
    setmessage({ error: false, msg: "" });
    // setstartride({
    //   carmodel: startride.carmodel,
    //   nooftravellers: startride.nooftravellers,
    //   fareperperson: startride.fareperperson,
    //   waynumber: startride.waynumber,
    //   timeofstart: {
    //     hours: startride.timeofstart.hours,
    //     minutes: startride.timeofstart.minutes,
    //   },
    // });

    if (startride.carmodel === "") {
      setmessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }

    if (startride.nooftravellers === 0) {
      setmessage({ error: true, msg: "Atleast one passenger is mandatory!" });
      return;
    }

    if (
      startride.timeofstart.hours > 24 ||
      startride.timeofstart.hours < 0 ||
      startride.timeofstart.minutes > 59 ||
      startride.timeofstart.minutes < 0
    ) {
      setmessage({ error: true, msg: "Please Enter valid Time!" });
      return;
    }

    if (!authUser) {
      setmessage({ error: true, msg: "Signing in is Required!" });
      return;
    }

    try {
      await setDoc(doc(db, "rides", `${authUser.email}`), {
        Car_Model: startride.carmodel,
        No_of_Passengers: startride.nooftravellers,
        Fare_per_Person: startride.fareperperson,
        Way_number: startride.waynumber,
        Time_of_start: {
          Hours: startride.timeofstart.hours,
          Minutes: startride.timeofstart.minutes,
        },
      });
      setmessage({ error: false, msg: "Successfully added your Ride!" });
      navigate("/acceptride");
    } catch (err) {
      setmessage({ error: true, msg: err.message });
    }
  };

  const navtomapinit = () => {
    navigate("/mapinit");
  };
  const navtomapfin = () => {
    navigate("/mapfin");
  };

  const handlechange = (event) => {
    const { name, value } = event.target;
    setstartride((prevData) => ({ ...prevData, [name]: value }));
  };
  const handlechangeint = (event) => {
    const { name, value } = event.target;
    setstartride((prevData) => ({ ...prevData, [name]: parseInt(value, 10) }));
  };

  return (
    <div>
      
      {/* <Map example={example} setexample={setexample} /> */}
      <Form onSubmit={addride}>
      {message?.msg && (
        <Alert
          variant={message?.error ? "danger" : "success"}
          dismissible
          onClose={() => setmessage("")}
          className="myalert"
        >
          {message?.msg}
        </Alert>
      )}
        <Form.Group className="mb-3" controlId="formBookAuthor">
          <InputGroup>
            <InputGroup.Text id="formBookAuthor">Way</InputGroup.Text>
            <button className="logbutt">View Map</button>
            <Form.Control
              type="Number"
              placeholder="Way number"
              name="waynumber"
              value={startride.waynumber}
              onChange={handlechangeint}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBookAuthor">
          <InputGroup>
            <InputGroup.Text id="formBookAuthor" className="carmod">
              Car model
            </InputGroup.Text>
            <Form.Control class="car"
              type="text"
              placeholder="Enter the model"
              name="carmodel"
              value={startride.carmodel}
              onChange={handlechange}
              style={{margin:0}}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBookAuthor">
          <InputGroup>
            <InputGroup.Text id="formBookAuthor">
              No of passengers travelling
            </InputGroup.Text>
            <Form.Control
              type="Number"
              // placeholder="Enter no of people travelling"
              name="nooftravellers"
              value={startride.nooftravellers}
              onChange={handlechangeint}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBookAuthor">
          <InputGroup>
            <InputGroup.Text id="formBookAuthor">
              Fare per Person
            </InputGroup.Text>
            <Form.Control
              type="Number"
              placeholder="Enter in rupees"
              name="fareperperson"
              value={startride.fareperperson}
              onChange={handlechangeint}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBookAuthor">
          <InputGroup>
            <InputGroup.Text id="formBookAuthor">
              Time of start(24 hours)
            </InputGroup.Text>
            <Form.Control
              type="Number"
              placeholder="Hours"
              value={startride.timeofstart.hours.toString().padStart(2, "0")}
              onChange={handlechangeint}
            />
            <Form.Control
              type="Number"
              placeholder="Minutes"
              value={startride.timeofstart.minutes.toString().padStart(2, "0")}
              onChange={handlechangeint}
            />
          </InputGroup>
        </Form.Group>

        {/* <div className="d-grid gap-2"> */}
        <Button type="Submit" className="logbutt">
          Add Ride
        </Button>
        {/* </div> */}
      </Form>
    </div>
  );
};

export default InitiateRide;
