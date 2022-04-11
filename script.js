// Old version

// DOM Elements
const speakButton = document.getElementById('speech-play');
const textArea = document.getElementById('textarea');
const volumeRange = document.getElementById('volume');
const rateRange = document.getElementById('rate');
const pitchRange = document.getElementById('pitch');
const voiceSelect = document.getElementById('voices');

// Global Variables
var msg = new SpeechSynthesisUtterance();
let voices;

// Event Listeners
const speakAction = speakButton.addEventListener('click', speak);

// Initialize
// wait on voices to be loaded before fetching list
window.speechSynthesis.onvoiceschanged = function() {
    voices = window.speechSynthesis.getVoices();
    loadVoices();
};

onload = function()
{
    // prevents play button from not working
    speechSynthesis.cancel();
    loadSettings();
};

// Adds options to the voice select list
function loadVoices() {
    for(let i = 0; i < voices.length; i++) {
        var option = document.createElement('option');
        var index = voices[i];
        option.value = index;
        option.innerText = index.name + ' (' + index.lang + ')';
        voiceSelect.appendChild(option);
    };
}

function speak() {
    msg.voice = voices[voiceSelect.selectedIndex];
    msg.volume = volumeRange.value; // From 0 to 1
    msg.rate = rateRange.value; // From 0.1 to 10
    msg.pitch = pitchRange.value; // From 0 to 2
    msg.text = textArea.value;
    speechSynthesis.speak(msg);

    saveSettings();
}

function saveSettings() {
    sessionStorage.setItem('voice', voiceSelect.selectedIndex);
    sessionStorage.setItem('volume', volumeRange.value);
    sessionStorage.setItem('rate', rateRange.value);
    sessionStorage.setItem('pitch', pitchRange.value);
}

function loadSettings(){
    if(sessionStorage.getItem('voice') !== null){
        voiceSelect.selectedIndex = sessionStorage.getItem('voice');
    }
    if(sessionStorage.getItem('volume') !== null){
        volumeRange.value = sessionStorage.getItem('volume');
    }
    if(sessionStorage.getItem('rate') !== null){
        rateRange.value = sessionStorage.getItem('rate');
    }
    if(sessionStorage.getItem('pitch') !== null){
        pitchRange.value = sessionStorage.getItem('pitch');
    }
}