import React, { useState } from 'react'
import '../App.css';
import '../Outline.css';

export default function LandinPage(props) {

    const [zip, setZip] = useState('')

    return (
        // console.log(props.handleSubmit),
        <form onSubmit={(e) => props.handleSubmit(e, zip)}>
            <div class="form-group" >
                <label style={{
                    marginTop: "50px",
                    fontWeight: "800",
                    color:"white",
                    textShadow: "1px 1px black",
                }}> Enter Your Zip Code: </label>
                <input style={{
                    borderTopStyle: "hidden",
                    borderRightStyle: "hidden",
                    borderLeftStyle: "hidden",
                    borderBottomStyle: "groove",
                    backgroundColor: "#eee",
                    borderRadius: "25px",
                    margin: "10px",
                    inputFocus:"none"
                }}
                    onChange={(e) => setZip(e.target.value)}></input>
                <button style={{
                    borderRadius: "25px"
                }} type="submit" class="btn btn-primary">Enter</button>
            </div>
        </form >
    )
}