import React from "react";
import { useNavigate } from "react-router-dom";

const Choose = () => {
  const navigate = useNavigate();
  const NavtoDriver = () => {
    navigate("/addride");
  };
  const NavtoPassenger = () => {
    navigate("/passinput");
  };
  return (
    <div className="home-container">
      <nav className="navbar">CARPOOLING</nav>
      <form>
      <h1 className="fant">CHOOSE</h1>
        <button onClick={NavtoDriver} className="logbutt">
          Driver
        </button>
        <br />
        <br />
        <button onClick={NavtoPassenger} className="logbutt">
          Passenger
        </button>
      </form>
    </div>
  );
};

export default Choose;
