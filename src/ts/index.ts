import { notesToPlayInOrder } from "./music-to-play";

function playMusic() {
    const notes = notesToPlayInOrder;
    
    // TODO Play these notes one after the other at the pitch and rhythm given in each note
    
    let bpm = 240;

    notes.forEach
    (function playNext(note, index, notes)  
    {   // index and notes are not reqd in the parameters since I only used "note" but I still added it
        
        const audio = new Audio(); // creating audio // REVIEW - Unclear instantiation - better to call the constructor with a source URL
        //audio.src used below does the same as -> [//let URL = document.getElementById("id").src; // const audio = new Audio(URL);]
        
        let pitchOctave = note.pitch + note.octave.toString(); // Repeated code added here

        if(note.accidental) // Find the source which has accidental 
        {
            audio.src = pitchOctave + " " + note.accidental + ".mp3";  
        }
        else
        {
            audio.src = pitchOctave + ".mp3";  
        }

        audio.play();

        setTimeout( () => // Pause the audio after (notes[i].beats * 60 * 1000 / bpm)ms 
        {
            audio.pause();
        }, (note.beats) * ((60 * 1000) / bpm )); // BEATS_PER_MINUTE = 240, X BEATS = Y milliseconds  
    });
}

document.getElementById('start-playing')?.addEventListener('click', playMusic);

