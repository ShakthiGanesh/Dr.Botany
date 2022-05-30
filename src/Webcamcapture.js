import React from "react";
import "./Webcamcapture.css";
import Webcam from "react-webcam";
import { useRef } from "react";
import { useStateValue } from "./StateProvider";
import { useState } from "react";
import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Webcamcapture() {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const [form, setform] = useState(null);
  const [{ disease, crop, Action }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [cure, setcure] = useState(false);
  const videoConstraints = {
    width: 256,
    height: 256,
    facingMode: "environment",
  };

  const webcamRef = useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log(imageSrc);
    // base64 = imageSrc;
    setImage(imageSrc);
    const base64 = imageSrc; // Place your base64 url here.
    fetch(base64)
      .then((res) => res.blob())
      .then((blob) => {
        const fd = new FormData();
        const file = new File([blob], "filename.jpeg");
        fd.append("name", crop);
        fd.append("file", file);
        setform(fd);
      });
  }, [webcamRef]);
  const predictImage = (e) => {
    console.log(form);
    axios
      .post("http://localhost:8000/predict", form)
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
        dispatch({
          type: "VIEW_RES",
          viewRes: true,
        });
        dispatch({
          type: "URL",
          url: image,
        });

        navigate("/results");
      })
      .catch((err) => {
        alert(err);
        navigate("/home");
      });
  };
  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          dispatch({
            type: "VIEW_RES",
            viewRes: true,
          });

          dispatch({
            type: "URL",
            url: url,
          });
        });
      }
    );
  };

  return (
    <div className="webcam-content">
      <div
        className="close"
        onClick={() => {
          dispatch({
            type: "ACTION",
            Action: null,
          });
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>
      {image == "" ? (
        <Webcam
          audio={false}
          height={256}
          ref={webcamRef}
          screenshotFormat="image/jpg"
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
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setImage("");
            }}
            className="capture-btn"
          >
            Retake Image
          </button>
          <button onClick={predictImage} className="capture-btn">
            Predict
          </button>
        </div>
      )}
    </div>
  );
}
export default Webcamcapture;
