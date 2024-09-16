import {useEffect, useRef, useState} from 'react';
import {useQuery} from '@apollo/client';
import {QUERY_RECORDINGS} from '../utils/queries';
import Auth from '../utils/auth';
import Keystroke from '../components/Keystroke';
import Tipjar from '../components/Tipjar';
// import kick from '../assets/sounds/kick.wav';
// import openHat from '../assets/sounds/openHat.wav';
// import boom from '../assets/sounds/boom.wav';
// import clap from '../assets/sounds/clap.wav';
// import hihat from '../assets/sounds/hihat.wav';
// import scratchin from '../assets/sounds/scratchin.wav';
// import shaka from '../assets/sounds/shaka.wav';
// import snare from '../assets/sounds/snare.wav';
// import thump from '../assets/sounds/thump.wav';
// import tom from '../assets/sounds/tom.wav';

const Home = () => {
    const openHatRef = useRef();
    const hiHatRef = useRef();
    const shakaRef = useRef();
    const clapRef = useRef();
    const scratchRef = useRef();
    const snareRef = useRef();
    const kickRef = useRef();
    const thumpRef = useRef();
    const tomRef = useRef();
    const boomRef = useRef();

    //Section will need refactoring lator///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [recording, startStop] = useState(false);
    const isMounted = useRef(false);

    let audioContext =useRef(null);
    let destination = useRef(null);
    let mediaRecorder = useRef(null);
    let recordedChunks = useRef([]);

    function initAudioContext() {
        if (!audioContext.current) {
            audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
            destination.current = audioContext.current.createMediaStreamDestination();
            mediaRecorder.current = new MediaRecorder(destination.current.stream);
    
            mediaRecorder.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.current.push(event.data);
                }
            };
    
            mediaRecorder.current.onstop = () => {
                if (recordedChunks.current.length > 0) {
                    const audioBlob = new Blob(recordedChunks.current, { type: 'audio/webm' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    console.log('Recorded audio URL:', audioUrl);
    
                    // Change "save" functions here
                    document.querySelector('.playback').dataset.audio = JSON.stringify(audioUrl);
                    document.querySelector('.playback').disabled = false;
                    // Change "save" functions here
       
                    recordedChunks.current = [];
                } else {
                    console.error('No audio data recorded.');
                }
            };
        }
    }
    
    function addTrackToStream(audioSrc) {
        const audioElement = new Audio(audioSrc);
        const track = audioContext.current.createMediaElementSource(audioElement);
        track.connect(destination.current);
    
        audioElement.play();
    }
    
    function playbackRecordedAudio(event) {
        const recordedAudio = new Audio(JSON.parse(event.target.dataset.audio))
        recordedAudio.play();

    }
    

    useEffect(()=>{
        if(isMounted.current)
            if(recording){
                audioContext.current = null;
                initAudioContext(audioContext.current);
                mediaRecorder.current.start();
                console.log('Recording started.');
            }else{
                mediaRecorder.current.stop();
                console.log('Recording stopped.');
            }
        else{
            isMounted.current = true;
        }

    },[recording])





////////////////////////////////////////



    const refs = [openHatRef, hiHatRef, shakaRef, clapRef, scratchRef, snareRef, kickRef, thumpRef, tomRef, boomRef];
    const { loading, data } = useQuery(QUERY_RECORDINGS);
    const recordings = data?.recordings || [];

    const playSound = (event) => {
        const currentRef = refs.find((refPoint) => refPoint.current.dataset.key === event.keyCode.toString());

        if (!currentRef) return;
        const audio = currentRef.current.children[1];
        const key = currentRef.current.children[0];

        if (!audio) return;
        audio.currentTime = 0;

        const playable = new Audio(audio.src);
        playable.play();
        addTrackToStream(audio.src);
        key.classList.add('playing');

        setTimeout(() => removeTransition(key), 200);
    };




    function removeTransition(key) {
        key.classList.remove('playing');
    }

    window.addEventListener('keydown', playSound)

    return (
        <main>
            {Auth.loggedIn() ? (
                <>
                    <div>
                        <button className="key record"  onClick={() => startStop(!recording)}  variant="contained">{recording?'Stop Recording':'Record'}</button>
                        <button className="key playback" onClick={playbackRecordedAudio} variant="outlined">Playback</button>
                    </div>
                </>
            ) : (
                <>
                    <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                        Login to record your own tracks.
                    </p>
                </>
            )}
                <div className="bg-icon">
                    <div className="keys" onKeyDown={playSound}>
                    <Keystroke dataKey="65" keystrokeKey="A" refProp={openHatRef} soundType="OpenHat" src="/assets/sounds/openHat.wav" />
                    <Keystroke dataKey="83" keystrokeKey="S" refProp={hiHatRef} soundType="HiHat" src="/assets/sounds/hihat.wav" />
                    <Keystroke dataKey="68" keystrokeKey="D" refProp={shakaRef} soundType="Shaka" src="/assets/sounds/shaka.wav" />
                    <Keystroke dataKey="70" keystrokeKey="F" refProp={clapRef} soundType="Clap" src="/assets/sounds/clap.wav" />
                    <Keystroke dataKey="71" keystrokeKey="G" refProp={scratchRef} soundType="Scratchin'" src="/assets/sounds/scratchin.wav" />
                    <Keystroke dataKey="72" keystrokeKey="H" refProp={snareRef} soundType="Snare" src="/assets/sounds/snare.wav" />
                    <Keystroke dataKey="74" keystrokeKey="J" refProp={kickRef} soundType="Kick" src="/assets/sounds/kick.wav" />
                    <Keystroke dataKey="75" keystrokeKey="K" refProp={tomRef} soundType="Tom" src="/assets/sounds/tom.wav" />
                    <Keystroke dataKey="76" keystrokeKey="L" refProp={boomRef} soundType="Boom" src="/assets/sounds/boom.wav" />
                    </div>

                <div className="keys" onKeyDown={playSound}>
                    <Keystroke dataKey="32" keystrokeKey="|__|" refProp={thumpRef} soundType="Thump" src="/assets/sounds/thump.wav" />
                </div>
            </div>
            <Tipjar/>
        </main>
    );
};

export default Home;
