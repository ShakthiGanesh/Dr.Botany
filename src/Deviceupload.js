import React from "react";
import "./Deviceupload.css";
import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
function Deviceupload() {
  const [progress, setProgress] = useState(0);
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
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
        getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
      }
    );
  };
  return (
    <div className="from-device">
      <FontAwesomeIcon icon={faXmark} className="close" />
      <form onSubmit={formHandler}>
        <input type="file" className="choose-file" />
        <button type="submit" className="upload-btn">
          Upload
        </button>
      </form>
      {/* <h3>Uploaded {progress} %</h3> */}
    </div>
  );
}

export default Deviceupload;
