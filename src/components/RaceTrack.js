import React, { useState, useEffect } from "react";
import CarProgressBar from "./CarProgressBar";

const Timer = ({ started, percentComplete }) => {
    const [time, setTime] = useState(0);

    let intervalId;

    useEffect(() => {

        if (started) {
            intervalId = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [started]);

    useEffect(() => {
        console.log(percentComplete);
        if (!started) {
            console.log('clearing interval');
            clearInterval(intervalId);
        }
    }, [percentComplete]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return <>{formatTime(time)}</>;
};


const InfoBar = ({ wpm, percentComplete, started }) => {
    return (
        <div className="info-box">
            <div className="info-box-item">
                <span className="info-box-label">WPM: </span>
                <span className="info-box-value">{wpm}</span>
            </div>
            <div className="info-box-item">
                <span className="info-box-label">Progress: </span>
                <span className="info-box-value">{percentComplete}%</span>
            </div>
            <div className="info-box-item">
                <span className="info-box-label">Time: </span>
                <span className="info-box-value">
                    <Timer started={started} percentComplete={percentComplete} />
                </span>
            </div>
        </div>
    )
}


const RaceTrack = ({ wpm, percentComplete, started }) => {
    return (
        <div className="race-track">
            <InfoBar
                wpm={wpm} percentComplete={percentComplete} started={started}
            />
            <CarProgressBar percentComplete={percentComplete} />
        </div>
    )
}

export default RaceTrack;