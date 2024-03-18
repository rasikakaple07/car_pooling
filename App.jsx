import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./authentication/signin";
import SignUp from "./authentication/signup";
import Authdetails from "./authentication/authdetails";
import InitiateRide from "./Firestore/addingride";
import Joinride from "./Firestore/joiningride";
import RidesList from "./Firestore/joiningride";
import JoinedList from "./Firestore/acceptingride";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Choose from "./others/choose";
import HeaderDrive from "./navbar/headerdriver";
import Headerpass from "./navbar/headerpassenger";
import AcceptedList from "./Firestore/joinedride";
import MapInit from "./mapsinput/mapinit";
import MapFin from "./mapsinput/mapfin";
import { Passengerinput } from "./others/passengerinput";

export default function Mybutton() {
  const [hp, sethp] = useState("");
  const [ema, setema] = useState("");
  return (
    // <div>
    //   <SignIn />
    //   <SignUp />
    //   <Authdetails />
    //   <InitiateRide />
    //   <Joinride />
    //   <RidesList />
    //   <JoinedList />
    //   {/* <Map /> */}
    // </div>
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div>
              {/* <Kvnav /> */}
              <SignIn appu={ema} setappu={setema} />
              {/* <Authdetails /> */}
              {/* <Choose /> */}
            </div>
          }
        ></Route>
        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route exact path="/choose" element={<Choose />}></Route>
        <Route
          exact
          path="/addride"
          element={
            <div>
              <HeaderDrive />
              <InitiateRide />
              {/* <Authdetails /> */}
            </div>
          }
        ></Route>
        <Route
          exact
          path="/acceptride"
          element={
            <div>
              <HeaderDrive />
              <JoinedList appu={ema} />
              {/* <Authdetails /> */}
            </div>
          }
        ></Route>
        <Route
          exact
          path="/passinput"
          element={
            <div>
              <Headerpass />
              <Passengerinput />
            </div>
          }
        ></Route>
        <Route
          exact
          path="/join"
          element={
            <div>
              <Headerpass />
              <Joinride />
            </div>
          }
        ></Route>
        <Route
          exact
          path="/joinedlist"
          element={
            <div>
              <Headerpass />
              <AcceptedList />
            </div>
          }
        ></Route>
        <Route
          exact
          path="/mapinit"
          element={
            <div>
              <MapInit kv={hp} setkv={sethp} />
            </div>
          }
        ></Route>
        <Route
          exact
          path="/mapfin"
          element={
            <div>
              <MapFin kv={hp} setkv={sethp} />
            </div>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
