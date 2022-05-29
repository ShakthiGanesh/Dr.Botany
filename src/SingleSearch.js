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