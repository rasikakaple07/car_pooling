// import Map from "./maps";

import React from "react";
import { useState } from "react";
// const Sodi2 = ({ raju, ts, hp, sethp }) => {
const Sodi2 = ({ appu, yashita }) => {
  // const [active, setactive] = useState(false);
  // const change = () => {
  //   return setactive(true);
  // };
  //   <Map kv={hp} setkv={sethp} />;

  const a = [1, 2, 3, 4, 5, 6, 7];
  const b = [9, 10, 11, 12, 13];
  const c = [14, 15, 16, 17, 18, 19, 20, 21, 22];
  const d = [23, 24, 25, 26, 27, 28, 29,30];
  // const a=[32,13,12,11,10,8,9,7];
  // const b=[30,31,3,4,5,6,1,2];
  // const c=[34,14,33,15,16,21,17,18,19,20];
  // const d=[35,29,26,36,24,23,25,22,28,27];
  let yoyo;

  var num1 = parseInt(appu);
  var num2 = parseInt(yashita);
  // var num1 = parseInt(sessionStorage.getItem("initpoint"));
  // var num2 = parseInt(sessionStorage.getItem("finpoint"));
  console.log("num1 :" + num1);
  console.log("num2 :" + num2);
  let counta = 0,
    countb = 0,
    countc = 0,
    countd = 0;

  for (let i = 0; i < a.length; i++) {
    if (a[i] === num1 && counta < 2) {
      counta++;
    }
    if (a[i] === num2 && counta < 2) {
      counta++;
    }
  }

  for (let i = 0; i < b.length; i++) {
    if (b[i] === num1 && countb < 2) {
      countb++;
    }
    if (b[i] === num2 && countb < 2) {
      countb++;
    }
  }

  for (let i = 0; i < c.length; i++) {
    if (c[i] === num1 && countc < 2) {
      countc++;
    }
    if (c[i] === num2 && countc < 2) {
      countc++;
    }
  }

  for (let i = 0; i < d.length; i++) {
    if (d[i] === num1 && countd < 2) {
      countd++;
    }
    if (d[i] === num2 && countd < 2) {
      countd++;
    }
  }
  if (counta === 2 && countb === 0 && countc === 0 && countd === 0) {
    yoyo = "TAXI1.";
    return 1;
  } else if (counta === 0 && countb === 2 && countc === 0 && countd === 0) {
    yoyo = "TAXI2.";
    return 2;
  } else if (counta === 0 && countb === 0 && countc === 2 && countd === 0) {
    yoyo = "TAXI3.";
    return 3;
  } else if (counta === 0 && countb === 0 && countc === 0 && countd === 2) {
    yoyo = "TAXI4.";
    return 4;
  } else if (
    (counta > 0 && countb > 0) ||
    (counta > 0 && countc > 0) ||
    (counta > 0 && countd > 0) ||
    (countb > 0 && countc > 0) ||
    (countb > 0 && countd > 0) ||
    (countc > 0 && countd > 0)
  ) {
    yoyo = "Vehicle not available on this route at the moment.";
    return 5;
  } else {
    yoyo = "Vehicle not available.";
    return 6;
  }
  console.log(yoyo);
  // ts(yoyo);
  sessionStorage.setItem("raju", yoyo);
  // console.log("raju :" + raju);
  return;
  // return <div></div>;
};

export default Sodi2;
