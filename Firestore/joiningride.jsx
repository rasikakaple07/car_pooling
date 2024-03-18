import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap.min.css';
import RideDataService from "./rideservices";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../authentication/firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { Alert } from "react-bootstrap";
import { db } from "../authentication/firebase";

const RidesList = () => {
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
  let myemail = sessionStorage.getItem("email");
  const [message, setmessage] = useState({ error: false, msg: "" });

  const Notify = async (e, nooftravellers, rideproducer) => {
    e.preventDefault();
    setmessage({ error: false, msg: "" });

    if (!authUser) {
      setmessage({ error: true, msg: "Signing in is required!" });
      return;
    }
    if (nooftravellers === 4) {
      setmessage({ error: true, msg: "OOPS! Already full" });
      return;
    }
    try {
      if (
        (await getDoc(doc(db, "notifications", `${rideproducer}`))).exists()
      ) {
        //document already exists
        await updateDoc(doc(db, "notifications", `${rideproducer}`), {
          joining: arrayUnion(`${authUser.email}`),
        });
        // await updateDoc;
      } else {
        //document doesn't exists
        await setDoc(doc(collection(db, "notifications"), `${rideproducer}`), {
          joining: [`${myemail}`],
          joined: [],
          declined: [],
        });
        await setDoc(doc(collection(db, "accepted"), `${myemail}`), {
          still: [`${rideproducer}`],
          accepted: [],
          declined: [],
        });
      }
      //accepted array
      try {
        if ((await getDoc(doc(db, "accepted", `${myemail}`))).exists()) {
          //document already exists
          await updateDoc(doc(db, "accepted", `${myemail}`), {
            still: arrayUnion(`${rideproducer}`),
          });
          // await updateDoc;
        } else {
          //document doesn't exists
          await setDoc(doc(collection(db, "accepted"), `${myemail}`), {
            still: [`${rideproducer}`],
            accepted: [],
            declined: [],
          });
        }
      } catch (er) {}
      setmessage({ error: false, msg: "Request Sent!Wait untill accepted" });
    } catch (err) {
      setmessage({ error: true, msg: err.message });
    }
  };

  const [rides, setRides] = useState([]);
  useEffect(() => {
    getRides();
  }, []);

  const getRides = async () => {
    const data = await RideDataService.getAllRides();
    console.log(data.docs);
    setRides(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const waynum = useState(sessionStorage.getItem("selectedwayno"));
  let i = 1;
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
      <Table striped bordered hover size="sm">
        <thead>
          <tr class="yoyomain">
            <th>S.No</th>
            <th>Driver</th>
            <th>Way Number</th>
            <th>Start time</th>
            <th>Car model</th>
            <th>No. of passengers</th>
            <th>Fare</th>
            <th>Join</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((doc, index) => {
            return parseInt(waynum, 10) === parseInt(doc.Way_number, 10) ? (
              <tr class="yoyo"key={doc.id}>
                <td>{i++}</td>
                <td>{doc.id}</td>
                <td>{doc.Way_number}</td>
                <td>
                  {doc.Time_of_start.Hours.toString().padStart(2, "0")} :{" "}
                  {doc.Time_of_start.Minutes.toString().padStart(2, "0")}
                </td>
                <td>{doc.Car_Model}</td>
                <td>{doc.No_of_Passengers}</td>
                <td>₹{doc.Fare_per_Person}</td>
                <td>
                  <Button
                    // variant="success"
                    className="join"
                    onClick={(e) => Notify(e, doc.No_of_Passengers, doc.id)}
                  >
                    Join
                  </Button>
                </td>
              </tr>
            ) : (
              <div></div>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default RidesList;
