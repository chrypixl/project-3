import {useEffect, useRef, useState} from 'react';
import {useQuery} from '@apollo/client';
import {QUERY_RECORDINGS} from '../utils/queries';
import Auth from '../utils/auth';
import Keystroke from '../components/Keystroke';
import Tipjar from '../components/Tipjar';
import kick from '../assets/sounds/kick.wav';
import openHat from '../assets/sounds/openHat.wav';
import boom from '../assets/sounds/boom.wav';
import clap from '../assets/sounds/clap.wav';
import hihat from '../assets/sounds/hihat.wav';
import scratchin from '../assets/sounds/scratchin.wav';
import shaka from '../assets/sounds/shaka.wav';
import snare from '../assets/sounds/snare.wav';
import thump from '../assets/sounds/thump.wav';
import tom from '../assets/sounds/tom.wav';
import { postDb } from '../utils/idb';



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
    let saveChunks = useRef([]);

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
                    saveChunks.current = recordedChunks.current;
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

    function saveAudio(){
        postDb({chunks: saveChunks.current})
    }





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
            {/*{Auth.loggedIn() ? (
                <>
                    <div>
                        <button className="keys">Record</button>
                        <button className="keys">Playback</button>
                    </div>
                </>
            ) : (
                <>
                    <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                        Login to record your own tracks.
                    </p>
                </>
            )}*/}
            <div>
                <button className="keys record"  onClick={() => startStop(!recording)}  variant="contained">{recording?'Stop Recording':'Record'}</button>
                <button className="keys playback" onClick={playbackRecordedAudio} variant="outlined">Playback</button>
                <button className="keys save" onClick={saveAudio} variant="outlined">Save Recording</button>
            </div>
                <div className="bg-icon">
                    <div className="keys" onKeyDown={playSound}>
                        <Keystroke dataKey="65" keystrokeKey={"A"} refProp={openHatRef} soundType="OpenHat" src={openHat} />
                        <Keystroke refProp={hiHatRef} dataKey="83" keystrokeKey={"S"} soundType="HiHat" src={hihat} />
                        <Keystroke refProp={shakaRef} dataKey="68" keystrokeKey={"D"} soundType="Shaka" src={shaka} />
                        <Keystroke refProp={clapRef} dataKey="70" keystrokeKey={"F"} soundType="Clap" src={clap} />
                        <Keystroke refProp={scratchRef} dataKey="71" keystrokeKey={"G"} soundType="Scratchin'" src={scratchin} />
                        <Keystroke refProp={snareRef} dataKey="72" keystrokeKey={"H"} soundType="Snare" src={snare} />
                        <Keystroke src={kick} refProp={kickRef} dataKey="74" keystrokeKey={"J"} soundType="Kick" />
                        <Keystroke refProp={tomRef} src={tom} dataKey="75" keystrokeKey={"K"} soundType="Tom" />
                        <Keystroke refProp={boomRef} dataKey="76" keystrokeKey={"L"} soundType="Boom" src={boom} />
                    </div>

                <div className="keys">
                    <Keystroke dataKey="32" keystrokeKey="|__|" refProp={thumpRef} soundType="Thump" src={thump} />
                </div>
            </div>
            <Tipjar/>
        </main>
    );
};

export default Home;
