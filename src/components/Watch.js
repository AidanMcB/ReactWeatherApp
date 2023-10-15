import React, {useState, useEffect} from 'react';

export default function Watch() {

    const [time, setTime] = useState(0)
   
    useEffect( () => {
        setTime({time: new Date().toLocaleTimeString})
    }, [] )
    return(
        <div className="float-right-top" style={{position:"absolute", right:"0", top:"0", marginRight:"10px"}}> 
            <h3 style={{color:"White", textShadow:"1px 1px black"}}>
                {}
            </h3>
        </div>
    );
};