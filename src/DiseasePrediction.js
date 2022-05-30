import React, { useState } from "react";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DiseasePrediction({ file, Plant }) {
  console.log(file);
  const [{ disease, crop, image, Action }, dispatch] = useStateValue();
  const [alertBox, setalertBox] = useState(false);
  const [cure, setcure] = useState(false);
  const navigate = useNavigate();
  let formData = new FormData();
  formData.append("name", Plant);

  formData.append("file", file);

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
      .catch((err) => alert("File Upload Error"));
  else alert("Upload image of width and height 256px");

  return <div></div>;
}
