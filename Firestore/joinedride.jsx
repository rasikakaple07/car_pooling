import React from "react";
import "./joinedride.css"
import {
  collection,
  getDocs,
  Doc,
  getDoc,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { Alert, Table } from "react-bootstrap";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth, { db } from "../authentication/firebase";

const AcceptedList = () => {
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
  const [message, setmessage] = useState({ error: false, msg: "" });
  const [requestedArray, setrequestedArray] = useState([]);
  const [acceptedArray, setacceptedArray] = useState([]);
  const [declinedArray, setdeclinedArray] = useState([]);
  const myemail = sessionStorage.getItem("email");
  useEffect(() => {
    // setem(appu);
    // const myemail = sessionStorage.getItem("email");
    // setem(myemail);
    getNotifications();
    // console.log(requestedArray);
  }, []);
  const getNotifications = async (e) => {
    setmessage({ error: false, msg: "" });
    console.log("hi");
    const notifyDoc = doc(db, "accepted", `${myemail}`);
    const document = await getDoc(notifyDoc);
    if (document.exists()) {
      setrequestedArray(document.data().still);
      setacceptedArray(document.data().accepted);
      setdeclinedArray(document.data().declined);
      console.log(document.data().joining);
    } else {
      setrequestedArray([]);
      setacceptedArray([]);
      console.log("no document!");
    }
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
      <h1 class="yourequested">Your Requests</h1>
      <Table bordered hover size="sm">
        <thead>
          <tr class="yoyomain">
            <th>S.NO</th>
            <th>PEOPLE</th>
          </tr>
        </thead>
        <tbody>
          {requestedArray.map((item, index) => (
            <tr class="yoyo">
              <td>{index + 1}</td>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h1 class="yourequested">You are riding with..</h1>
      <Table bordered hover size="sm">
        <thead>
          <tr class="yoyomain">
            <th>S.NO</th>
            <th>PEOPLE</th>
          </tr>
        </thead>
        <tbody>
          {acceptedArray.map((item, index) => (
            <tr class="yoyo">
              <td>{index + 1}</td>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h1 class="yourequested">These declined your request</h1>
      <Table bordered hover size="sm">
        <thead>
          <tr class="yoyomain">
            <th>S.NO</th>
            <th>PEOPLE</th>
          </tr>
        </thead>
        <tbody>
          {declinedArray.map((item, index) => (
            <tr class="yoyo">
              <td>{index + 1}</td>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AcceptedList;
