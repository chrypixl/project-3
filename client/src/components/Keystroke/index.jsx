const Keystroke = ({
    dataKey, keystrokeKey, soundType, src, refProp
}) => {

    return (
        <div ref={refProp} data-key={dataKey}>
            <div className="key" id={keystrokeKey.toLowerCase()}> 
                <kbd>{keystrokeKey}</kbd>
                <span>{soundType}</span>
            </div>
            <audio src={src}></audio>
        </div>
    );
};

export default Keystroke;