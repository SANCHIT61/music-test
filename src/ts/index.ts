import { notesToPlayInOrder } from "./music-to-play";

function playMusic() {
    const notes = notesToPlayInOrder;
    
    // TODO Play these notes one after the other at the pitch and rhythm given in each note
    
    let bpm = 240;

    notes.forEach
    (function playNext(note, index, notes)  // REVIEW - Weird choice - creating an anonymous function, then assigning it to a constant. Better to create a function declaration.
    {   // index and notes are not reqd in the parameters since i only used "note" but i still added it
        
        const audio = new Audio(); // creating audio // REVIEW - Unclear instantiation - better to call the constructor with a source URL

        if(note.accidental) // Find the source which has accidental // REVIEW - Unnecessarily complex condition. There are cleaner ways to check for a truthy value
        {
            audio.src = note.pitch + note.octave.toString() + " " + note.accidental + ".mp3";   // REVIEW - This is more readable with a couple of intermediate variables and template strings
        }
        else
        {
            audio.src = note.pitch + note.octave.toString() + ".mp3";  // REVIEW - Repeated code. Factor out some of this to make it readable
                                                                                // Plus, you are mixing single quotes and double quotes in the same line. It's recommended to choose one set and stick to it for the entire project
        }

        audio.play();

        setTimeout( () => // Pause the audio after (notes[i].beats * 250)ms // REVIEW - Fat arrow function might be a better fit here, since the function is anonymous anyway
        {
            audio.pause();
        }, (note.beats) * ((60 * 1000) / bpm )); // BEATS_PER_MINUTE = 240, X BEATS = Y milliseconds  // REVIEW - Calculation logic is hard to read. Can take more steps, with intermediate variables. 
                                    // Plus, there are no spaces between operators - inconsistent with previous style, which used spaces between them.
    });
}

document.getElementById('start-playing')?.addEventListener('click', playMusic);

