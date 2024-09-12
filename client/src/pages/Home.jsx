import { useRef } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_RECORDINGS } from '../utils/queries';
import Keystroke from '../components/Keystroke';
import kick from '../assets/sounds/kick.wav';
import openHat from '../assets/sounds/openHat.wav'
import boom from '../assets/sounds/boom.wav'
import clap from '../assets/sounds/clap.wav'
import hihat from '../assets/sounds/hihat.wav'
import scratchin from '../assets/sounds/scratchin.wav'
import shaka from '../assets/sounds/shaka.wav'
import snare from '../assets/sounds/snare.wav'
import thump from '../assets/sounds/thump.wav'
import tom from '../assets/sounds/tom.wav'

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

    const refs = [openHatRef, hiHatRef, shakaRef, clapRef, scratchRef, snareRef, kickRef, thumpRef, tomRef, boomRef];
    const { loading, data } = useQuery(QUERY_RECORDINGS);
    const recordings = data?.recordings || [];
    const keys = document.querySelectorAll('.key'); //? Change reference type, look at React compatible query selection

    function playSound(event) {
        event.preventDefault();

        const currentRef = refs.find((refPoint) => {
            if (refPoint.current.dataset.key == event.keyCode) {
                return refPoint
            }
        })

        const audio = currentRef.current.children[1]
        const key = currentRef.current.children[0];

        if (!audio) return;
        audio.currentTime = 0;

        const playable = new Audio(audio.src);
        playable.play();
        // addTrackToStream(audio.src);
        key.classList.add('playing');

        setTimeout(() => removeTransition(key), 200);
    };

    function removeTransition(key) {
        key.classList.remove('playing');
    }

    window.addEventListener('keydown', playSound) // Event listener inside use effect

    return (
        <main>
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
                    <Keystroke src={thump} refProp={thumpRef} dataKey="32" keystrokeKey={"|__|"} soundType="Thump" />
                </div>
            </div>
        </main>
    );
};

export default Home;