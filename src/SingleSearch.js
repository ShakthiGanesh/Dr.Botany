<<<<<<< HEAD
import React, { useEffect } from 'react'
import './SingleSearch.css'

function SingleSearch({ search }) {
    useEffect(() => {
        console.log(search)
    }, [])

    return (
        <div className='SingleSearch'>
            <img src={!search.querypic.includes("picture") ? search.querypic : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxQoMq6gcSQarhktBWi4Dm2q4RGVZW-8SfmYltwNYWl7UxBgvIjS2lCSYaDAamS97m9tk&usqp=CAU`} />
            <div className='SingleSearch-body'>
                <h1>{search.result}</h1>
                <p>{search.cure}</p>
            </div>
        </div>
    )
}

export default SingleSearch
=======
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
>>>>>>> 34b56521112aaf13c1cfdd3ead2304f313a1025d
