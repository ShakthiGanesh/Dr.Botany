import React, { useState, useEffect } from "react";
import "./Results.css";
import Header from "./Header";
import Loader from "./Loader.js";
import axios from "axios";
import { useStateValue } from "./StateProvider";
function Results() {
  const [
    { disease, crop, image, email, url, single_search, viewRes },
    dispatch,
  ] = useStateValue();
  const [cure, setcure] = useState({});
  const [search, setsearch] = useState([]);
  // const [viewRes, setviewRes] = useState(false);
  const [Dates, setDate] = useState("");
  const [Img, setImg] = useState("");
  function postHistory() {}

  useEffect(() => {
    var date = new Date().toString();
    var i = date.indexOf(" ");
    date = date.slice(i + 1);
    date = date.split(" G", 2)[0];
    setDate(date);
    axios
      .get("http://localhost:5000/getcure", {
        params: {
          disease: disease,
        },
      })
      .then((res) => {
        console.log(res.data);
        setcure(res.data);
        // axios
        //   .get(
        //     "https://api.rainforestapi.com/request?api_key=906D6D1B30164870BF9E46731C2E1988&type=search&amazon_domain=amazon.com&search_term=" +
        //       cure.medicine
        //   )
        //   .then((res) => {
        //     setsearch(res.data);
        //     console.log(res.data);
        //   });
        var date = new Date().toString();
        var i = date.indexOf(" ");
        date = date.slice(i + 1);
        date = date.split(" G", 2)[0];
        console.log(cure);
        console.log(url.toString());
        setImg(url);
        if (url != null) {
          axios
            .post("http://localhost:5000/addhistory", {
              email: email,
              query: {
                querypic: url,
                result: disease,
                impact: cure.impact,
                detection: cure.detection,
                cure: res.data.cure,
                date: date,
                plant: cure.crop,
              },
            })
            .then((res) => {
              console.log(res.data);
              dispatch({
                type: "URL",
                url: null,
              });
            })
            .catch((err) => console.log(err));
        }
      });
  }, [disease, url]);
  return (
    <div>
      {viewRes ? (
        <div className="results">
          <Header />
          <div className="resultsBox">
            <div className="date">{Dates}</div>
            <img src={image} alt="" />
            <div className="disease">
              <h2>Detected : {disease}</h2>
              {disease == "Healthy" ? (
                <div className="icon_green">
                  <i></i>
                </div>
              ) : (
                <div className="icon">
                  <i></i>
                </div>
              )}
            </div>
            <img src={Img} className="pic" alt="" srcset="" />
            {disease == "Healthy" ? (
              <div className="healthy_crop">
                <div className="Healthy">Your Crop is Healthy. . ! </div>
                <img
                  className="thumbs"
                  src="green_thumbs.jpg"
                  alt=""
                  srcset=""
                />
              </div>
            ) : (
              <div>
                <div className="detection">
                  <h5>Detection </h5>
                  <div>{cure.detection}</div>
                </div>

                <div className="impact">
                  <h5>Impact </h5>
                  <div>{cure.impact}</div>
                </div>
                <div className="cure">
                  <h5>Cure </h5>
                  <div>{cure.cure} </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
export default Results;
