import React from "react";
import { useState } from "react";
import "./maps.css";
import Popup from "reactjs-popup";
import { Form, useNavigate } from "react-router-dom";
//import { useHistory } from "react-router-dom";

//import { express } from "express";
// let clickedButton="raj";
//import bodyParser from "body-parser";
const MapFin = ({ kv, setkv }) => {
  //const history = useHistory();
  const [active, setactive] = useState(false);
  const [openpopup, setopenpopup] = useState(false);

  const change = () => {
    return setactive(true);
  };
  const [clickedButtonId, setClickedButtonId] = useState("");
  function handleClick(event) {
    setClickedButtonId(event.target.id);
    setkv(event.target.id);
    let inpoint = event.target.id;
    let inpointclass=event.target.className;
    console.log(inpointclass);
    sessionStorage.setItem("finpoint", inpoint);
    sessionStorage.setItem("finpointclass",inpointclass);
    console.log(inpoint);
    setopenpopup(true);
  }

  const HandleClosePopup = () => {
    setopenpopup(false);
  };
  const navigate = useNavigate();
  const navtoaddride = () => {
    navigate("/passinput");
  };
  return (
    <>
      <div class="image-background">
        <button id="1" class="Cafe_Good_Times" onClick={handleClick}></button>
        <button
          id="2"
          class="Sainik_Vishram_Grah_Roorkee"
          onClick={handleClick}
        ></button>
        <button id="3" class="Swansh_Library" onClick={handleClick}></button>
        <button id="4" class="Om_Garden" onClick={handleClick}></button>
        <button id="5" class="Shiv_Mandir" onClick={handleClick}></button>
        <button id="6" class="Essar_Petrol_Pump" onClick={handleClick}></button>
        <button id="7" class="Hemant_Hospital" onClick={handleClick}></button>
        <button
          id="8"
          class="BSM_PG_College_Roorkee"
          onClick={handleClick}
        ></button>
        <button id="9" class="KFC" onClick={handleClick}></button>
        <button
          id="10"
          class="Roorkee_City_Filling_Station"
          onClick={handleClick}
        ></button>
        <button id="11" class="K_L_Polytechnic" onClick={handleClick}></button>
        <button
          id="12"
          class="Hotel_View_Castle"
          onClick={handleClick}
        ></button>
        <button id="13" class="Oyo_Paradise_In" onClick={handleClick}></button>
        <button id="14" class="Badshah_Hotel" onClick={handleClick}></button>
        <button
          id="15"
          class="Sabji_Mandi_Roorkee"
          onClick={handleClick}
        ></button>
        <button id="16" class="Vishal_Mega_Mart" onClick={handleClick}></button>
        <button id="17" class="Reliance_Digital" onClick={handleClick}></button>
        <button
          id="18"
          class="Roorkee_Bus_Stand"
          onClick={handleClick}
        ></button>
        <button
          id="19"
          class="Motel_Divine_International"
          onClick={handleClick}
        ></button>
        <button id="20" class="Itsy_By_Treebo" onClick={handleClick}></button>
        <button id="21" class="Desi_Tadka" onClick={handleClick}></button>
        <button id="22" class="Kih_Lawn" onClick={handleClick}></button>
        <button id="23" class="Football_Ground" onClick={handleClick}></button>
        <button id="24" class="Aroma" onClick={handleClick}></button>
        <button
          id="25"
          class="Department_Of_Earthquake_Engineering"
          onClick={handleClick}
        ></button>
        <button id="26" class="Mehta_Events" onClick={handleClick}></button>
        
        <button
          id="27"
          class="Kendriya_Vidyalaya"
          onClick={handleClick}
        ></button>
        <button
          id="28"
          class="Balaji_Coaching_Academy"
          onClick={handleClick}
        ></button>
        <button id="29" class="Laxmi_Vihar" onClick={handleClick}></button>
        <button id="30" class="Sita_Ram_Degree_College" onClick={handleClick}></button>
        <button id="31" class="Uttarakhand_Board_Of_Technical_Education" onClick={handleClick}></button>
        <button id="32" class="Lotus" onClick={handleClick}></button>
        <button id="33" class="City_College_Of_Management" onClick={handleClick}></button>
        <button id="34" class="Solani_Aqueduct" onClick={handleClick}></button>
        <button id="35" class="Diamond_Heritage_Banquets_And_Lawn" onClick={handleClick}></button>
        <button id="36" class="CBRI_Play_Ground" onClick={handleClick}></button>

      </div>
      <Popup
        open={openpopup}
        modal
        closeOnDocumentClick
        onClose={HandleClosePopup}
      >
        {(close) => (
          <div className="popup-box-dimensions">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                <h5 class="modal-title"> Confirm</h5>
                </div>
                <div className="modal-footer">
                <button class="btn btn-primary"onClick={navtoaddride}>YES</button>
                <button className="btn btn-secondary" onClick={HandleClosePopup}>
                  NO
                </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
};

export default MapFin;
