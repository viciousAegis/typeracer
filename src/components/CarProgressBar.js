import React from 'react';

const CarProgressBar = ({ percentComplete }) => {

    const carPosition = {
        left: `${percentComplete}%`
    };

    return (
        <div className="car-progress-bar">
            <div className="car-progress-bar-track">
                <svg
                    className="car-progress-bar-svg"
                    style={carPosition}
                    width="73" height="37"
                    // have the anchor point of the svg be the center of the car
                    transform='translate(-36.5, -18.5)'
                >
                    <rect
                        x="14"
                        y="2"
                        width="44"
                        height="26"
                        fill="transparent"
                        rx="30"
                        stroke="#f582ae"
                        strokeWidth="2"
                    />

                    <rect
                        x="2"
                        y="14"
                        width="68"
                        height="16"
                        fill="#f582ae"
                        rx="6"
                    />

                    <g>
                        <line x1="29" y1="2" x2="29" y2="16" stroke="#f582ae" strokeWidth="2" />

                        <line x1="43" y1="2" x2="43" y2="16" stroke="#f582ae" strokeWidth="2" />
                    </g>

                    <g>
                        <rect x="0" y="22" width="8" height="4" fill="#999" rx="2" />

                        <rect x="65" y="22" width="8" height="4" fill="#999" rx="2" />
                    </g>

                    <g>
                        <circle r="8px" fill="#222" stroke="white" strokeWidth="2" cx="18" cy="28" />
                        <circle r="3px" fill="#555" cx="18" cy="28" />
                    </g>

                    <g>
                        <circle r="8px" fill="#222" stroke="white" strokeWidth="2" cx="54" cy="28" />
                        <circle r="3px" fill="#555" cx="54" cy="28" />
                    </g>

                    <g>
                        <circle r="3px" fill="gold" cx="68" cy="18" />

                        <circle r="2px" fill="orange" cx="3" cy="18" />
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default CarProgressBar;
