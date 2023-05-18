import React, { useState } from "react";
import RaceTrack from "./components/RaceTrack";
import TextCard from "./components/TextCard";


const ContentSection = ({text}) => {
    const [wpm, setWpm] = useState(0);
    console.log(wpm);
    const [percentComplete, setPercentComplete] = useState(0);
    const [started, setStarted] = useState(false);

    const startAgain = () => {
        // reload the page
        window.location.reload();
    };

    return (
        <div className="content-section">
            <button className="button" onClick={startAgain}>Start Again</button>
            <RaceTrack
                wpm={wpm}
                percentComplete={percentComplete}
                started={started}
            />
            <TextCard
                textToType={text}
                setWpm={setWpm}
                setPercentComplete={setPercentComplete}
                started={started}
                setStarted={setStarted}
            />
        </div>
    );
}

export default ContentSection;