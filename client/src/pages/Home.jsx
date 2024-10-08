import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_RECORDINGS } from '../utils/queries';
import Auth from '../utils/auth';
import Keystroke from '../components/Keystroke';
import kick from '/assets/sounds/kick.wav';
import openHat from '/assets/sounds/openhat.wav';
import boom from '/assets/sounds/boom.wav';
import clap from '/assets/sounds/clap.wav';
import hihat from '/assets/sounds/hihat.wav';
import scratchin from '/assets/sounds/scratchin.wav';
import shaka from '/assets/sounds/shaka.wav';
import snare from '/assets/sounds/snare.wav';
import thump from '/assets/sounds/thump.wav';
import tom from '/assets/sounds/tom.wav';
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

    const [recording, startStop] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const isMounted = useRef(false);

    let audioContext = useRef(null);
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

                    document.querySelector('.playback').dataset.audio = JSON.stringify(audioUrl);
                    document.querySelector('.playback').disabled = false;
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

    useEffect(() => {
        if (isMounted.current) {
            if (recording) {
                if (!audioContext.current) {
                    console.log('Initializing AudioContext and MediaRecorder...');
                    initAudioContext();
                }

                if (mediaRecorder.current) {
                    mediaRecorder.current.start();
                    console.log('Recording started.');
                } else {
                    console.error('Failed to start recording: MediaRecorder not initialized.');
                }
            } else {
                if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
                    mediaRecorder.current.stop();
                    console.log('Recording stopped.');
                } else {
                    console.error('No MediaRecorder to stop.');
                }
            }
        } else {
            isMounted.current = true;
        }
    }, [recording]);

    function saveAudio() {
        postDb({ chunks: saveChunks.current });
        setSaveMessage('Audio saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
    }

    const refs = [openHatRef, hiHatRef, shakaRef, clapRef, scratchRef, snareRef, kickRef, thumpRef, tomRef, boomRef];
    const { loading, data } = useQuery(QUERY_RECORDINGS);
    const recordings = data?.recordings || [];

    const playSound = (event) => {
        if (event.keyCode === 32) {
            event.preventDefault();
        }

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

    const handleClick = (event) => {
        const key = event.currentTarget.children[0];
        const audio = event.currentTarget.children[1];

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

    useEffect(() => {
        window.addEventListener('keydown', playSound);
        return () => window.removeEventListener('keydown', playSound);
    }, []);

    return (
        <main>
            {Auth.loggedIn() ? (
                <>
                    <div>
                        <button className="key record" onClick={() => startStop(!recording)} variant="contained">
                            {recording ? 'Stop Recording' : 'Record'}
                        </button>
                        <button className="key playback" onClick={playbackRecordedAudio} variant="outlined">Playback</button>
                        <button className="key save" onClick={saveAudio} variant="outlined">Save audio</button>
                    </div>
                    {saveMessage && <p className="save-notification">{saveMessage}</p>}
                </>
            ) : (
                <>
                    <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                        Login to record your own tracks.
                    </p>
                </>
            )}
            <div className="bg-icon">
                <div className="keys">
                    <Keystroke dataKey="65" keystrokeKey="A" refProp={openHatRef} soundType="OpenHat" src={openHat} onClick={handleClick} />
                    <Keystroke dataKey="83" keystrokeKey="S" refProp={hiHatRef} soundType="HiHat" src={hihat} onClick={handleClick} />
                    <Keystroke dataKey="68" keystrokeKey="D" refProp={shakaRef} soundType="Shaka" src={shaka} onClick={handleClick} />
                    <Keystroke dataKey="70" keystrokeKey="F" refProp={clapRef} soundType="Clap" src={clap} onClick={handleClick} />
                    <Keystroke dataKey="71" keystrokeKey="G" refProp={scratchRef} soundType="Scratchin'" src={scratchin} onClick={handleClick} />
                    <Keystroke dataKey="72" keystrokeKey="H" refProp={snareRef} soundType="Snare" src={snare} onClick={handleClick} />
                    <Keystroke dataKey="74" keystrokeKey="J" refProp={kickRef} soundType="Kick" src={kick} onClick={handleClick} />
                    <Keystroke dataKey="75" keystrokeKey="K" refProp={tomRef} soundType="Tom" src={tom} onClick={handleClick} />
                    <Keystroke dataKey="76" keystrokeKey="L" refProp={boomRef} soundType="Boom" src={boom} onClick={handleClick} />
                    
                </div>
                <div className="keys" onKeyDown={playSound}>
                    <Keystroke dataKey="32" keystrokeKey="|__|" refProp={thumpRef} soundType="Thump" src={thump} onClick={handleClick}/>
                </div>
            </div>
        </main>
    );
};

export default Home;
