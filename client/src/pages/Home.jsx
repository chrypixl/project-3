import { useRef, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_RECORDINGS } from '../utils/queries';
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

    const playSound = (event) => {
        const currentRef = refs.find((refPoint) => refPoint.current.dataset.key === event.keyCode.toString());

        if (!currentRef) return;
        const audio = currentRef.current.children[1];
        const key = currentRef.current.children[0];

        if (!audio) return;
        audio.currentTime = 0;

        const playable = new Audio(audio.src);
        playable.play();
        key.classList.add('playing');

        setTimeout(() => key.classList.remove('playing'), 200);
    };

    useEffect(() => {
        window.addEventListener('keydown', playSound);

        return () => {
            window.removeEventListener('keydown', playSound); 
        };
    }, []);

    return (
        <main>
            {Auth.loggedIn() ? (
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
            )}
            <div className="bg-icon">
                <div className="keys">
                    <Keystroke dataKey="65" keystrokeKey="A" refProp={openHatRef} soundType="OpenHat" src={openHat} />
                    <Keystroke dataKey="83" keystrokeKey="S" refProp={hiHatRef} soundType="HiHat" src={hihat} />
                    <Keystroke dataKey="68" keystrokeKey="D" refProp={shakaRef} soundType="Shaka" src={shaka} />
                    <Keystroke dataKey="70" keystrokeKey="F" refProp={clapRef} soundType="Clap" src={clap} />
                    <Keystroke dataKey="71" keystrokeKey="G" refProp={scratchRef} soundType="Scratchin'" src={scratchin} />
                    <Keystroke dataKey="72" keystrokeKey="H" refProp={snareRef} soundType="Snare" src={snare} />
                    <Keystroke dataKey="74" keystrokeKey="J" refProp={kickRef} soundType="Kick" src={kick} />
                    <Keystroke dataKey="75" keystrokeKey="K" refProp={tomRef} soundType="Tom" src={tom} />
                    <Keystroke dataKey="76" keystrokeKey="L" refProp={boomRef} soundType="Boom" src={boom} />
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
