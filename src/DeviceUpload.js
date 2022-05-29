import React, { useEffect } from "react";
import "./Deviceupload.css";
import $ from "jquery";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStateValue } from "./StateProvider";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import DiseasePrediction from "./DiseasePrediction.js";
function Deviceupload({ plant }) {
  const [progress, setProgress] = useState(0);
  const [{ disease, crop, image, Action, viewRes }, dispatch] = useStateValue();
  const [File, setFile] = useState([]);
  const [alertBox, setalertBox] = useState(false);
  const [cure, setcure] = useState(false);
  const navigate = useNavigate();
  //   imgInp.onchange = (evt) => {
  //    };

  useEffect(() => {
    $("#imgInp").change(function () {
      if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          console.log(e);
          $("#blah").attr("src", e.target.result);
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  }, []);

  //   var loadFile = function (event) {
  //     var output = document.getElementById("output");
  //     output.src = URL.createObjectURL(event.target.files[0]);
  //     output.onload = function () {
  //       URL.revokeObjectURL(output.src); // free memory
  //     };
  //   };

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
    console.log(file + " " + plant);
    let formData = new FormData();
    formData.append("name", crop);
    formData.append("file", file);
    dispatch({
      type: "VIEW_RES",
      viewRes: false,
    });
    console.log(formData);
    if (alertBox == false) {
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
        })
        .catch((err) => {
          alert("Upload image of width and height 256px");
          navigate("/home");
        });
      navigate("/results");
    } else alert("Upload image of width and height 256px");
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
    <div className="from-device">
      <img id="blah" src="leaf.svg" alt="" />
      <form id="form1" runat="server" onSubmit={formHandler}>
        <input
          type="file"
          id="imgInp"
          className="choose-file"
          onChange={(e) => {
            setFile([...File, e.target.files[0]]);
            console.log(File);
            console.log(e.target.files[0]);
          }}
        />

        <button type="submit" className="upload-btn">
          Upload
        </button>
      </form>
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
      {/* <h3>Uploaded {progress} %</h3> */}
    </div>
  );
}

export default Deviceupload;
