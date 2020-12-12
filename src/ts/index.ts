import { notesToPlayInOrder } from "./music-to-play";
import { BEATS_PER_MINUTE as bpm } from "./musical-score";

function playMusic() {
    // TODO Play these notes one after the other at the pitch and rhythm given in each note
    
    let srcNodeList = document.getElementsByClassName("audio-elements-holder")[0].querySelectorAll("audio[src*='./src/assets']");
    const length = srcNodeList.length;
    const timeOut = (length * ((60 * 1000) / bpm)); // BEATS_PER_MINUTE = 240, X BEATS = Y milliseconds
    let audio = new Audio();
    audio.load();
    
    (function () {
    for (let i = 0; i < length; i++) {
            let sourceUrl = srcNodeList[i].getAttribute('src')
            if (sourceUrl) {
                audio.src = sourceUrl
            }
            let playPromise = audio.play();
            if ((playPromise !== undefined) || (playPromise !== null)) {  // same as - [if (playPromise)]
                playPromise
                .then(() => {
                    setTimeout(() => // Pause the audio after -> (((total number of beats) * 60 * 1000) / (bpm)) milliseconds 
                    {
                       audio.pause();
                    }, timeOut)  
                })
                .catch(e => {
                    console.log(`Error is -> ${e}`); // Template literal
                })
            }
        }
    })
    (); // Self invoking function 
} 

document.getElementById('start-playing')?.addEventListener('click', playMusic);

