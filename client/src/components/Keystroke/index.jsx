const Keystroke = ({
    dataKey, keystrokeKey, soundType
}) => {

    return (
        <div data-key={dataKey} className="key" id={keystrokeKey.toLowerCase()}> 
            <kbd>{keystrokeKey}</kbd>
            <span soundType="sound">{soundType}</span>
        </div>
    );
};

export default Keystroke;