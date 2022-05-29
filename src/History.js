import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './History.css'
import SingleSearch from './SingleSearch'

function History() {
    const [list, setList] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/gethistory", {
            params: {
                email: "122004231@sastra.ac.in"
            }
        })
            .then(res => setList(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='History'>
            <h1>Your searches</h1>
            {
                list.map(item => <SingleSearch search={item} />)
            }
        </div>

    )
}

export default History