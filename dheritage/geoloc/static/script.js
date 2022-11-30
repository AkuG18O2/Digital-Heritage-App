const play_button = document.querySelector('#play-button');
const geo_button = document.querySelector('#geo-button');
const cards = document.getElementsByClassName('cards')[0];
const nearby = document.getElementsByClassName('nearby')[0];
const nearby_list = document.getElementsByClassName('nearby-list')[0];

var appState = "OFF";
var speech = new SpeechSynthesisUtterance();
var loc = [];
var reached = false;

function buttonPress() {
    // context.resume();
    if (appState == "ON") {
        appState = "OFF";
        play_button.style.backgroundColor = "green";
        // osc.disconnect(volume);
        speech.text = "Powering Off."
        window.speechSynthesis.speak(speech);    
        cards.innerHTML = "";
        nearby_list.innerHTML = "";
        reached = false;
        nearby.classList.add('invisible');
        geo_button.classList.add('invisible');
    } else {
        appState = "ON";
        play_button.style.backgroundColor = "red";
        // osc.connect(volume);
        speech.text = "Powering On."
        window.speechSynthesis.speak(speech);
        nearby.classList.remove('invisible');
        geo_button.classList.remove('invisible');
    }
    play_button.innerHTML = appState;
}

function update()
{
    if (appState == "OFF")
        return;
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://127.0.0.1:8000/locations', false); // false for synchronous request
    xmlHttp.send(null);
    console.log(xmlHttp.responseText);
    const obj = JSON.parse(xmlHttp.responseText);

    var f = false;
    var curLocation = obj[0];
    var cardsHTML = "";
    var nearbyHTML = "";
    for (let i = 1; i < obj.length; i++) {
        const location = obj[i];
        if (Math.abs(location.x - curLocation.x) < 10 && Math.abs(location.y - curLocation.y) < 10 && Math.abs(location.yaw - curLocation.yaw) < 15) {
            f = true;
            if (!reached) {
                speech.text = location.voice_message;
                window.speechSynthesis.speak(speech);                        
            } 
            cardsHTML += '<div class="card" id="' + location.location_name + '"> \
                <h3>' + location.location_name + '</h3> \
                ' + location.description + ' \
            </div>';
        }
        nearbyHTML += '<div>' + location.location_name + '</div>'
    }
    cards.innerHTML = cardsHTML;
    nearby_list.innerHTML = nearbyHTML;
    reached = f;
}

const interval = setInterval(() => {
    update();
   }, 1000);