import React from 'react';
import './style.css'; 

const Keystroke = ({ dataKey, keystrokeKey, soundType, src, refProp, onClick }) => {
    return (
        <div ref={refProp} data-key={dataKey} className="keystroke-container" onClick={onClick}>
            <div className="key" id={keystrokeKey.toLowerCase()}> 
                <kbd>{keystrokeKey}</kbd>
                <span>{soundType}</span>
            </div>
            <audio src={src}></audio>
        </div>
    );
};

export default Keystroke;
