import React, { useState, useEffect } from "react";
import "./Results.css";
import Header from "./Header";
import Loader from "./Loader.js";
import axios from "axios";
import { useStateValue } from "./StateProvider";
function ResultsHistory() {
  const [
    { disease, crop, image, email, url, single_search },
    dispatch,
  ] = useStateValue();
  const [cure, setcure] = useState({});
  const [search, setsearch] = useState([]);
  const [viewRes, setviewRes] = useState(false);
  const [Dates, setDate] = useState("");
  const [Img, setImg] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setviewRes(true);
    }, 5000);
  }, []);
  return (
    <div>
      {viewRes ? (
        <div className="results">
          <Header />
          <div className="resultsBox">
            <div className="date">{single_search.date}</div>
            <div className="disease">
              <h2>Detected : {single_search.result}</h2>
              {single_search.result == "Healthy" ? (
                <div className="icon_green">
                  <i></i>
                </div>
              ) : (
                <div className="icon">
                  <i></i>
                </div>
              )}
            </div>
            <img
              src={single_search.querypic}
              className="pic"
              alt=""
              srcset=""
            />
            {single_search.result == "Healthy" ? (
              <div className="Healthy">Your Crop is Healthy</div>
            ) : (
              <div>
                <div className="detection">
                  <h5>Detection </h5>
                  <div>{single_search.detection}</div>
                </div>

                <div className="impact">
                  <h5>Impact </h5>
                  <div>{single_search.impact}</div>
                </div>
                <div className="cure">
                  <h5>Cure </h5>
                  <div>{single_search.cure} </div>
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
export default ResultsHistory;
