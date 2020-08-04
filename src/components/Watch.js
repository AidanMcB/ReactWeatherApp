import React, {useState, useEffect} from 'react';

export default function Watch() {

    const [time, setTime] = useState('')
    const displayTime = () => {
        let today = new Date()
        let minutes = today.getMinutes()
        let hours = today.getHours()
        let time = ""
        if(minutes < 9){
            minutes = `0${minutes}`
        }
        if(hours > 12){
            hours = hours - 12 
        }else if(hours < 10){
            hours = `0${hours}`
        }
        return `${hours}:${minutes}`
    }
    return(
        <div>
        <h1>It is currently: {displayTime()}</h1>
            {time}
        </div>
    )
}