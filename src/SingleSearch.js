import React, { useEffect } from "react";
import "./SingleSearch.css";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";
function SingleSearch({ search }) {
  const [
    { disease, crop, image, Action, single_search },
    dispatch,
  ] = useStateValue();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(search);
  }, []);

  return (
    <div
      className="SingleSearch"
      onClick={(e) => {
        dispatch({
          type: "SINGLE_SEARCH",
          single_search: search,
        });
        navigate("/resultshistory");
      }}
    >
      <img src={search.querypic} />
      <div className="SingleSearch-body">
        <h1>{search.result}</h1> <p>{search.cure}</p>
      </div>
    </div>
  );
}

export default SingleSearch;
