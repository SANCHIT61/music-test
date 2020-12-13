import { notesToPlayInOrder } from "./music-to-play";
import { BEATS_PER_MINUTE as bpm } from "./musical-score";

function playMusic() {
    // TODO Play these notes one after the other at the pitch and rhythm given in each note
    
    let srcNodeList = document.getElementsByClassName("audio-elements-holder")[0].querySelectorAll("audio[src*='./src/assets']");
    const length = srcNodeList.length;
    const timeOut = (length * ((60 * 1000) / bpm)); // BEATS_PER_MINUTE = 240, X BEATS = Y milliseconds
    let musicArray = Array.from(srcNodeList); // Created array out of NodeList<E>
    let playPromise;
    let i = -1;
    let audio = new Audio();
    audio.load();

    (function play() {
        i+=1;
        if (i >= length) {
            return ;
        }

        let sourceUrl = musicArray[i].getAttribute('src');
        if (sourceUrl) {
            audio.src = sourceUrl
        }
        playPromise = audio.play();
        if ((playPromise !== undefined) || (playPromise !== null)) {  // same as - [if (playPromise)]
            console.log(`Started playing -> ${sourceUrl} -> ${i}`);
            playPromise
            .then(() => {
                setTimeout(() => // Pause the audio after -> (((total number of beats) * 60 * 1000) / (bpm)) milliseconds 
                {
                    audio.pause();
                    console.log(`Paused?? -> ${i}`);
                    play();
                }, timeOut)  
            })
            .catch(e => {
                console.log(`${i} Error is -> ${e}`);
            })
        }
    })
    (); // Self invoking function 
} 

document.getElementById('start-playing')?.addEventListener('click', playMusic);

