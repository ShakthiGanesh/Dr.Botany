import React from "react";
import "./Loader.css";

function Loader() {
  return (
    <div className="Loader">
      <img src="leaf.svg" alt="loading" />
      <div className="screen"></div>
    </div>
  );
}

export default Loader;
