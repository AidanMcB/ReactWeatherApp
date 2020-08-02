import React, {useState} from 'react'

export default function LandinPage(props){

    const [zip, setZip] = useState('')

    return(
        // console.log(props.handleSubmit),
        <form onSubmit={(e) => props.handleSubmit(e,zip)}>
        <label>Enter Your Zip Code: </label>
        <input onChange={(e) => setZip(e.target.value)}></input>
        <button type="submit">Enter</button>
        </form>
    )
}