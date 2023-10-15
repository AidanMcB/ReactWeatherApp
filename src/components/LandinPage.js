import React from 'react';
import '../App.css';
import '../Outline.css';

export default function LandinPage(props) {

    const [zip, setZip] = React.useState('');

    return (
        <form onSubmit={(e) => props.handleSubmit(e, zip)}>
            <div className="form-group" >
                <label style={{
                    marginTop: "50px",
                    fontWeight: "800",
                    color:"white",
                    textShadow: "1px 1px black",
                }}> 
                    Enter Your Zip Code: 
                </label>
                <input style={{
                    borderTopStyle: "hidden",
                    borderRightStyle: "hidden",
                    borderLeftStyle: "hidden",
                    borderBottomStyle: "groove",
                    backgroundColor: "#eee",
                    borderRadius: "25px",
                    margin: "10px",
                    inputFocus:"none"
                }} onChange={(e) => setZip(e.target.value)} />
                <button style={{ borderRadius: "25px" }} type="submit" className="btn btn-primary">
                    Enter
                </button>
            </div>
        </form >
    );
};