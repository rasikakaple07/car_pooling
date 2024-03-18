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
import React from "react";
import { Table, Button } from "react-bootstrap";
import { db } from "../authentication/firebase";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../authentication/firebase";
import { Alert } from "react-bootstrap";
import { get } from "react-hook-form";

// import { clickedButtonId } from "../map/map";

const JoinedList = ({ appu }) => {
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
  const [em, setem] = useState("");
  const [message, setmessage] = useState({ error: false, msg: "" });
  const [requestedArray, setrequestedArray] = useState([]);
  const [acceptedArray, setacceptedArray] = useState([]);
  const [declinedArray, setdeclinedArray] = useState([]);
  useEffect(() => {
    // setem(appu);
    // const myemail = sessionStorage.getItem("email");
    setem(myemail);
    getNotifications();
    // console.log(requestedArray);
  }, []);
  let myemail = sessionStorage.getItem("email");
  const getNotifications = async (e) => {
    // e.preventDefault();
    setmessage({ error: false, msg: "" });
    // while (!authUser);
    // if (!authUser) {
    //   setmessage({
    //     error: true,
    //     msg: "Signing in is required to view whom you are travelling with!",
    //   });
    //   return;
    // }
    console.log("hi");
    const notifyDoc = doc(db, "notifications", `${myemail}`);
    const document = await getDoc(notifyDoc);
    if (document.exists()) {
      setrequestedArray(document.data().joining);
      setacceptedArray(document.data().joined);
      setdeclinedArray(document.data().declined);
      console.log(document.data().joining);
    } else {
      setrequestedArray([]);
      setacceptedArray([]);
      console.log("no document!");
    }
  };

  const AcceptRide = async (e, joiningid) => {
    e.preventDefault();
    if (!authUser) {
      return;
    }
    const notifyDoc = doc(db, "notifications", `${myemail}`);
    try {
      await updateDoc(notifyDoc, {
        joining: arrayRemove(joiningid),
        joined: arrayUnion(joiningid),
      });
      //incresing passenger count by one
      try {
        const increaseDoc = doc(db, "rides", `${myemail}`);
        const updatingdoc = await getDoc(increaseDoc);
        await updateDoc(increaseDoc, {
          No_of_Passengers: updatingdoc.data().No_of_Passengers + 1,
        });
      } catch (erro) {
        setmessage({ error: true, msg: erro.message });
      }
      //notifying driver
      const acceptindoc = doc(db, "accepted", `${joiningid}`);
      try {
        await updateDoc(acceptindoc, {
          still: arrayRemove(`${authUser.email}`),
          accepted: arrayUnion(`${authUser.email}`),
        });
      } catch (er) {
        setmessage({ error: true, msg: er.message });
      }
      setmessage({ error: false, msg: "Thats Great!" });
    } catch (err) {
      setmessage({ error: true, msg: err.message });
    }
  };

  const DeclineRide = async (e, joiningid) => {
    e.preventDefault();
    const notifyDoc = doc(db, "notifications", `${myemail}`);
    try {
      await updateDoc(notifyDoc, {
        joining: arrayRemove(joiningid),
        declined: arrayUnion(joiningid),
      });
      //notifying driver
      const acceptindoc = doc(db, "accepted", `${joiningid}`);
      try {
        await updateDoc(acceptindoc, {
          still: arrayRemove(`${authUser.email}`),
          declined: arrayUnion(`${authUser.email}`),
        });
      } catch (er) {
        setmessage({ error: true, msg: er.message });
      }
      setmessage({ error: false, msg: "Okay!" });
    } catch (err) {
      setmessage({ error: true, msg: err.message });
    }
  };

  return (
    <div>
      {/* <h2>{authUser.email}</h2> */}
      {/* <h3>{clickedButtonId}</h3> */}
      {message?.msg && (
        <Alert
          variant={message?.error ? "danger" : "success"}
          dismissible
          onClose={() => setmessage("")}
        >
          {message?.msg}
        </Alert>
      )}
      <h1>These wanna join your ride!</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr class="yoyomain">
            <th>S.No</th>
            <th>TPeople</th>
            <th>Response</th>
          </tr>
        </thead>
        <tbody>
          {requestedArray.map((item, index) => (
            <tr class="yoyo">
              <td>{index + 1}</td>
              <td>{item}</td>
              <td>
                <button onClick={(e) => AcceptRide(e, item)}>Accept</button>
                <button
                  onClick={(e) => DeclineRide(e, item)}
                  className="bg-warning"
                >
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h1>You are riding with..</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr class="yoyomain">
            <th>S.No</th>
            <th>People</th>
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

      <h1>You previously declined..</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr class="yoyomain">
            <th>S.No</th>
            <th>People</th>
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

export default JoinedList;
