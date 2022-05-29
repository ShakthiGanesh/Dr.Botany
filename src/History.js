import axios from "axios";
import React, { useEffect, useState } from "react";
import "./History.css";
import Header from "./Header.js";
import SingleSearch from "./SingleSearch";
import { useStateValue } from "./StateProvider";
function History() {
    const [{ disease, crop, image, Action, email }, dispatch] = useStateValue();
    const [list, setList] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:5000/gethistory", {
                params: {
                    email: email,
                },
            })
            .then((res) => setList(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="whole">
            <Header />
            <img src="topview.jpg" id="bg" alt="" srcset="" />
            <div className="History">
                <h1>Your searches</h1>
                {list.map((item) => (
                    <SingleSearch search={item} />
                ))}
            </div>
        </div>
    );
}

export default History;
