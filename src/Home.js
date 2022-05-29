import React from "react";
import "./Home.css";
import logo from "./logo.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Button, ButtonGroup } from "react-bootstrap";
import Webcamcapture from "./Webcamcapture";
import Deviceupload from "./Deviceupload";
function Home() {
  const [action, setAction] = useState("");
  const [plant, setPlant] = useState("Choose Plant");
  return (
    <div className="home">
      <div className="content">
        <img className="logo" src={logo} />
        <div className="plant-dropdown">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="toggle"
            >
              {plant}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setPlant("Choose Plant")}>
                Choose Plant
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setPlant("Potato")}>
                Potato
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setPlant("Tomato")}>
                Tomato
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setPlant("Cotton")}>
                Cotton
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="image-dropdown">
          <Dropdown as={ButtonGroup}>
            <Button variant="success">Choose Image</Button>
            <Dropdown.Toggle
              split
              variant="success"
              id="dropdown-split-basic"
            />
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setAction("takephoto")}>
                Take Photo
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setAction("fromdevice")}>
                From device
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {action == "takephoto" ? <Webcamcapture /> : null}
        {action == "fromdevice" ? <Deviceupload /> : null}
      </div>
    </div>
  );
}
export default Home;
