import {useQuery} from '@apollo/client';
import {QUERY_RECORDINGS} from '../utils/queries';
import Keystroke from '../components/Keystroke';

const Home = () => {
    const { loading, data } = useQuery(QUERY_RECORDINGS);
    const recordings = data?.recordings || [];
    const keys = document.querySelectorAll('.key'); //? Change reference type, look at React compatible query selection
  
    function playSound(event) {
        event.preventDefault();
    
        const audio = document.querySelector(`audio[data-key = "${event.keyCode}"]`); //? Change reference type, look at useRef hook
        const key = document.querySelector(`.key[data-key = "${event.keyCode}"]`); //? Change reference type, look at useRef hook
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
        addTrackToStream(audio.src);
        key.classList.add('playing');
    };

    function removeTransition(event) {
        if(event.propertyName !== 'transform') return;
        this.classList.remove('playing');
    }

    window.addEventListener('keydown', playSound) // Event listener inside use effect
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));

    return (
        <main>
            <div className="bg-icon">
                <div className="keys" onKeyDown={playSound}>
                    <Keystroke dataKey="65" keystrokeKey={"A"} soundType="OpenHat"/>
                    <Keystroke dataKey="83" keystrokeKey={"S"} soundType="HiHat"/>
                    <Keystroke dataKey="68" keystrokeKey={"D"} soundType="Shaka"/>
                    <Keystroke dataKey="70" keystrokeKey={"F"} soundType="Clap"/>
                    <Keystroke dataKey="71" keystrokeKey={"G"} soundType="Scratchin'"/>
                    <Keystroke dataKey="72" keystrokeKey={"H"} soundType="Snare"/>
                    <Keystroke dataKey="74" keystrokeKey={"J"} soundType= "Kick"/>
                    <Keystroke dataKey="75" keystrokeKey={"K"} soundType="Tom"/>
                    <Keystroke dataKey="76" keystrokeKey={"L"} soundType="Boom"/>
                </div>
            
                <div className="keys">
                    <Keystroke dataKey="32" keystrokeKey={"|__|"} soundType="Thump"/>
                </div>
            </div>

            <audio data-key="65" src="../assets/sounds/openhat.wav"></audio>
            <audio data-key="83" src="../assets/sounds/hihat.wav"></audio>
            <audio data-key="68" src="../assets/sounds/shaka.wav"></audio>
            <audio data-key="70" src="../assets/sounds/clap.wav"></audio>
            <audio data-key="71" src="../assets/sounds/scratchin'.wav"></audio>
            <audio data-key="72" src="../assets/sounds/snare.wav"></audio>
            <audio data-key="74" src="../assets/sounds/kick.wav"></audio>
            <audio data-key="75" src="../assets/sounds/tom.wav"></audio>
            <audio data-key="76" src="../assets/sounds/boom.wav"></audio>
            <audio data-key="32" src="../assets/sounds/thump.wav"></audio>
        </main>
    );
};

export default Home;