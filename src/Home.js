import React, { useState } from "react";
import "./Home.css";
import Header from "./Header";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from "./logo.png";
import Webcam from "react-webcam";
import { useRef } from "react";
import $ from "jquery";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Dropdown, ButtonGroup } from "react-bootstrap";
import Resizer from "react-image-file-resizer";
import Webcamcapture from "./Webcamcapture";
import Deviceupload from "./DeviceUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [{ disease, crop, image, Action }, dispatch] = useStateValue();
  const [action, setAction] = useState(null);

  const handleOpen = () => setmodal(true);
  const handleClose = () => setmodal(false);
  const [File, setFile] = useState("");
  const [alertBox, setalertBox] = useState(false);
  const [modal, setmodal] = useState(false);
  const [Plant, setPlant] = useState("Choose Your Plant...");
  const [cure, setcure] = useState(false);
  const webRef = useRef(null);
  const navigate = useNavigate();
  var _URL = window.URL || window.webkitURL;
  $("#file").change(function (e) {
    var file, img;
    if ((file = this.files[0])) {
      img = new Image();
      var objectUrl = _URL.createObjectURL(file);
      img.onload = function () {
        if (this.width != 256 && this.height != 256) {
          alert("Upload image of width and height 256px");
          setalertBox(true);
        } else setalertBox(false);
      };
      img.src = objectUrl;
    }
  });

  function showDropdown() {
    $(".plantNames").show();
  }

  function hideDropdown() {
    $(".plantNames").hide();
  }

  // const sendFile = async () => {
  //   if (image) {
  //     setIsloading(false);
  //   }
  // };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    console.log(File[0]);
    //const file = event.target.files[0];
    //const image = await resizeFile(File[0]);
    //console.log(image);
    let formData = new FormData();
    formData.append("name", Plant);

    formData.append("file", File[0]);

    console.log(formData);
    if (alertBox == false)
      axios
        .post("http://localhost:8000/predict", formData)
        .then((res) => {
          console.log(res.data);
          setcure(true);
          dispatch({
            type: "DISEASE",
            disease: res.data.class,
          });
          dispatch({
            type: "CROP",
            crop: res.data.name,
          });
          dispatch({
            type: "IMAGE",
            image: File,
          });
          navigate("/results");
        })
        .catch((err) => navigate("/home"));
    else alert("Upload image of width and height 256px");

    // let res = await axios({
    //   method: "post",
    //   url: "http://localhost:8000/predict",
    //   data: File[0],
    // });
    // if (res.status === 200) {
    //   console.log(res.data);
    // }

    // axios
    //   .post("http://localhost:8000/predict", {
    //     name: Plant,
    //     file: File,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  };
  return (
    // <div className="home">
    //   {/* <img
    //     className="background-image"
    //     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsG3r3muHoPy6PyGBoSxD4TkUnUb4Md_eUaA&usqp=CAU"
    //   /> */}
    //   <Header />
    //   <div className="content">
    //     <img className="logo" src={logo} />
    //     <Button onClick={() => setmodal(true)}>Detect Disease</Button>
    //     {/*
    //     {modal ? ( */}
    //     <Modal show={modal} style={{ opacity: 1 }} onHide={handleClose}>
    //       <Modal.Header closeButton>
    //         <Modal.Title>Detect Disease</Modal.Title>
    //       </Modal.Header>
    //       <Modal.Body>
    //         {/* <div
    //           className="choosePlant"
    //           onClick={showDropdown}
    //           onMouseLeaven={hideDropdown}
    //         >
    //           Select Plant
    //           <div className="plantNames">
    //             <p onClick={() => setPlant("Potato")}>Potato</p>
    //             <p onClick={() => setPlant("Potato")}>Potato</p>
    //             <p onClick={() => setPlant("Potato")}>Potato</p>
    //           </div>
    //         </div> */}
    //         <div className="form">
    //           <label>Select your Crop : </label>
    //           <Dropdown>
    //             <Dropdown.Toggle
    //               variant="success"
    //               id="dropdown-basic"
    //               className="toggle"
    //             >
    //               {Plant}
    //             </Dropdown.Toggle>

    //             <Dropdown.Menu>
    //               <Dropdown.Item onClick={() => setPlant("potato")}>
    //                 Potato
    //               </Dropdown.Item>
    //               <Dropdown.Item onClick={() => setPlant("tomato")}>
    //                 Tomato
    //               </Dropdown.Item>
    //               <Dropdown.Item onClick={() => setPlant("cotton")}>
    //                 Cotton
    //               </Dropdown.Item>
    //             </Dropdown.Menu>
    //           </Dropdown>
    //         </div>
    //         {/* <form onSubmit={onFormSubmit}>
    //           <h1>File Upload</h1>
    //           <input type="file" onChange={this.onChange} />
    //           <button type="submit">Upload</button>
    //         </form> */}
    //         <div className="form">
    //           <label>Upload</label>
    //           <input
    //             type="file"
    //             name="file"
    //             id="file"
    //             onChange={(e) => {
    //               setFile(e.target.files);
    //             }}
    //           />
    //         </div>

    //         <Button onClick={(e) => onFormSubmit(e)}>
    //           Capture or upload Image
    //         </Button>
    //       </Modal.Body>
    //       <Modal.Footer>
    //         <Button onClick={handleClose}>Close</Button>
    //       </Modal.Footer>
    //     </Modal>
    //     {/* ) : (
    //       ""
    //     )} */}
    //     <Webcam ref={webRef} />
    //   </div>
    // </div>
    <div className="home">
      <img src="topview.jpg" id="bg" alt="" srcset="" />
      <Header />
      <div className="content">
        <img className="logo" src={logo} />
        <div className="plant-dropdown">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="toggle"
            >
              {Plant}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setPlant("Choose Plant")}>
                Choose Plant
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setPlant("Potato");
                  dispatch({
                    type: "CROP",
                    crop: "potato",
                  });
                }}
              >
                Potato
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setPlant("Tomato");
                  dispatch({
                    type: "CROP",
                    crop: "tomato",
                  });
                }}
              >
                Tomato
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setPlant("Cotton");
                  dispatch({
                    type: "CROP",
                    crop: "cotton",
                  });
                }}
              >
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
              <Dropdown.Item
                onClick={() => {
                  setAction("takephoto");
                  dispatch({
                    type: "ACTION",
                    Action: "takephoto",
                  });
                }}
              >
                Take Photo
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setAction("fromdevice");
                  dispatch({
                    type: "ACTION",
                    Action: "fromdevice",
                  });
                }}
              >
                From device
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {Action == "takephoto" ? <Webcamcapture plant={Plant} /> : null}
        {Action == "fromdevice" ? <Deviceupload /> : null}
      </div>
    </div>
  );
}
export default Home;

// import React from "react";
// import "./Home.css";
// import logo from "./logo.png";
// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
// import { Dropdown, Button, ButtonGroup } from "react-bootstrap";
// import Webcamcapture from "./Webcamcapture";
// import Deviceupload from "./Deviceupload";
// function Home() {
//   const [action, setAction] = useState("");
//   const [plant, setPlant] = useState("Choose Plant");
//   return (

//   );
// }
// export default Home;
