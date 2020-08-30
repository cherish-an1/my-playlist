var nowPlaying = document.querySelector(".now-playing");
var trackArt = document.querySelector(".track-art");
var trackName = document.querySelector(".track-name");
var trackArtist = document.querySelector(".track-artist");

var prevBtn = document.querySelector(".prev-track");
var playPauseBtn = document.querySelector(".playpause-track");
var nextBtn = document.querySelector(".next-track");

var volumeSlider = document.querySelector(".volume_slider");
var seekSlider = document.querySelector(".seek_slider");
var currentTime = document.querySelector(".current-time");
var totalDuration = document.querySelector(".total-duration");

let trackIndex = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player 
let currentTrack = document.createElement('audio'); 

//updating the media
let trackList = [
    {
        name: "Beautifulname", 
        artist: "Hillsong", 
        path: "playlist/what_a_beautiful_name.mp3"
    },
    {
        name: "TheProphecy", 
        artist: "Juanita Bynum", 
        path: "playlist/the_prophecy.mp3"
    },
    {
        name: "More", 
        artist: "Lawrence Flower", 
        path: "playlist/more.mp3"
    },
    {
        name: "Awesome", 
        artist: "Charles Jenkins", 
        path: "playlist/my_God_is_awesome.mp3"
    },
    {
        name: "TrustInYou", 
        artist: "Lauren Daigle", 
        path: "playlist/trust_in_you.mp3"
    },
];


function loadTrack(trackIndex) {
    clearInterval(updateTimer);
    resetValues();

    currentTrack.src = trackList[trackIndex].path;
    currentTrack.load();

    trackName.textContent = trackList[trackIndex].name;
    trackArtist.textContent = trackList[trackIndex].artist;
    nowPlaying.textContent = "PLAYING" + "" + (trackIndex+1) + "" + "OF" + "" + trackList.length;

    // for updating the seek slider 
    // updateTimer = setInterval(seekUpdate, 1000); 

    currentTrack.addEventListener("ended", nextTrack);
    // Apply a random background color  
}

function resetValues(){
    currentTime.textContent = "00:00";
    totalDuration.textContent ="00:00";
    seekSlider.value = 0;
}

function playPauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack(){
    currentTrack.play();
    isPlaying = true;

    playPauseBtn.innerHTML = `<i class="fa fa-pause-circle fa-5x"></i>`;
}

function pauseTrack() {
    currentTrack.pause();
    isPlaying = false;

    playPauseBtn.innerHTML = `<i class="fa fa-play-circle fa-5x"></i>`;
}

function nextTrack() {
    if (trackIndex > 0)
    trackIndex -= 1;
    else trackIndex = trackList.length;

    loadTrack(trackIndex);
    playTrack();
}
function prevTrack() {
    if (trackIndex > 0)
    trackIndex -= 1;
    else trackIndex = trackList.length;

    loadTrack(trackIndex);
    playTrack();
}

function seekTo() {
    seekto = currentTrack.duration * (seekSlider.value / 100);

    currentTrack.currentTime =seekto;
}

function setVolume() {
    let seekPosition = 0;

    if (!NaN(currentTrack.duration)) {
        seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
        seekSlider.value = seekPosition;

        let currentMin = Math.floor(currentTrack.currentTime / 60);
        let currentSec = Math.floor(currentTrack.currentTime - currentMin * 60);
        let durationMin = Math.floor(currentTrack.duration / 60);
        let durationSec = Math.floor(currentTrack.duration - durationMin * 60);

        if (currentSec < 10) {
            currentSec = "0" + currentSec;
        }
        if (durationSec < 10) {
            durationSec = "0" + durationSec;
        }
        if (currentMin < 10) {
            currentMin = "0" + currentMin;
        }
        if (durationMin < 10) {
            durationMin + "0" + durationMin;
        }

        currentTime.textContent = currentMin +  ":" + currentSec;
        totalDuration.textContent = durationMin + ":" + durationSec;
    }
}

loadTrack(trackIndex);




















