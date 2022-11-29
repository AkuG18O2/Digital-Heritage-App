const play_button = document.querySelector('#play-button');
const card1 = document.querySelector('#card-1');
const card2 = document.querySelector('#card-2');
var appState = "OFF";
var speech = new SpeechSynthesisUtterance();
var loc = [];

// var context = new AudioContext();
// var osc = context.createOscillator();
// osc.type = 'triangle';
// // osc.frequency.value = frequency;
// osc.start();

// var volume = context.createGain(); 
// volume.gain.value = 0.1; 
// volume.connect(context.destination);

function buttonPress() {
    // context.resume();
    if (appState == "ON") {
        appState = "OFF";
        play_button.style.backgroundColor = "green";
        // osc.disconnect(volume);
        speech.text = "Powering Off."
        window.speechSynthesis.speak(speech);    
    } else {
        appState = "ON";
        play_button.style.backgroundColor = "red";
        // osc.connect(volume);
        speech.text = "Powering On."
        window.speechSynthesis.speak(speech);    
    }
    play_button.innerHTML = appState;
}

function reached(location) {
    if (appState == "OFF")
        return;
    if (loc.includes(location)) {
        const index = loc.indexOf(location);
        loc.splice(index, 1);
        if (location == 'AMUL')
            card1.classList.add('invisible');
        else
            card2.classList.add('invisible');
    } else {
        loc.push(location);
        speech.text = "You have reached " + location + ".";
        window.speechSynthesis.speak(speech);
        if (location == 'AMUL')
            card1.classList.remove('invisible');
        else
            card2.classList.remove('invisible');
    }
}