import React from "react";
import "./Webcamcapture.css";
import Webcam from "react-webcam";
import { useRef } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
function Webcamcapture() {
  const [image, setImage] = useState("");
  const videoConstraints = {
    width: 256,
    height: 256,
    facingMode: "user",
  };
  const webcamRef = useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log(imageSrc);
    setImage(imageSrc);
  }, [webcamRef]);
  return (
    <div className="webcam-content">
      <FontAwesomeIcon icon={faXmark} className="close" />
      {image == "" ? (
        <Webcam
          audio={false}
          height={256}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={256}
          videoConstraints={videoConstraints}
          className="webcam"
        />
      ) : (
        <img src={image} className="taken-photo" />
      )}
      {image == "" ? (
        <button onClick={capture} className="capture-btn">
          Take Photo
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            setImage("");
          }}
          className="capture-btn"
        >
          Retake Image
        </button>
      )}
    </div>
  );
}
export default Webcamcapture;
