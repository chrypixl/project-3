import { useQuery } from '@apollo/client';



import {QUERY_RECORDINGS} from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_RECORDINGS);
    const recordings = data?.recordings || [];

    return (
        <main>
            <div class="bg-icon">
                <div class="keys">
                    <div data-key="65" class="key" id="a">
                        <kbd>A</kbd>
                        <span class="sound">openhat</span>
                    </div>
                    <div data-key="83" class="key" id="s">
                        <kbd>S</kbd>
                        <span class="sound">hihat</span>
                    </div>
                    <div data-key="68" class="key" id="d">
                        <kbd>D</kbd>
                        <span class="sound">shaka</span>
                    </div>
                    <div data-key="70" class="key" id="f">
                        <kbd>F</kbd>
                        <span class="sound">clap</span>
                    </div>
                    <div data-key="71" class="key" id="g">
                        <kbd>G</kbd>
                        <span class="sound">scratchin'</span>
                    </div>
                    <div data-key="72" class="key" id="h">
                        <kbd>H</kbd>
                        <span class="sound">snare</span>
                    </div>
                    <div data-key="74" class="key" id="j">
                        <kbd>J</kbd>
                        <span class="sound">kick</span>
                    </div>
                    <div data-key="75" class="key" id="k">
                        <kbd>K</kbd>
                        <span class="sound">tom</span>
                    </div>
                    <div data-key="76" class="key" id="l">
                        <kbd>L</kbd>
                        <span class="sound">boom</span>
                    </div>
                </div>
            
                <div class="keys">
                    <div data-key="32" class="key" id="space">
                        <kbd>  </kbd>
                        <span class="sound">thump</span>
                    </div>
                </div>
            </div>

            <audio data-key="65" src="public/assets/sounds/openhat.wav"></audio>
            <audio data-key="83" src="public/assets/sounds/hihat.wav"></audio>
            <audio data-key="68" src="public/assets/sounds/shaka.wav"></audio>
            <audio data-key="70" src="public/assets/sounds/clap.wav"></audio>
            <audio data-key="71" src="public/assets/sounds/scratchin'.wav"></audio>
            <audio data-key="72" src="public/assets/sounds/snare.wav"></audio>
            <audio data-key="74" src="public/assets/sounds/kick.wav"></audio>
            <audio data-key="75" src="public/assets/sounds/tom.wav"></audio>
            <audio data-key="76" src="public/assets/sounds/boom.wav"></audio>
            <audio data-key="32" src="public/assets/sounds/thump.wav"></audio>
            <script src="public/js/audio.js"></script>
            <script src="public/js/index.js"></script>
        </main>
    );
};

export default Home;