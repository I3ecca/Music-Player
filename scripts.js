const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

//song titles note i did uppercase easch song title and it still works when we are lookinh for src
const songs = ["Hey", "Summer", "Ukulele"];

//keep track of song
let songIndex = 2;

//Initially load song details into DOM.
loadsong(songs[songIndex]);

//update song details
function loadsong(song){
    title.innerText = song;
    audio.src= `music/${song}.mp3`;
    cover.src= `images/${song}.jpg`;
}

function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");

    audio.play();
}
function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");

    audio.pause();
}

//Previous Song
function prevSong(){
    songIndex--;
    if(songIndex < 0 ){
        //length of array is 3 - 1, makes index 2. 
        songIndex = songs.length - 1;
    }

    loadsong(songs[songIndex]);
    playSong();    
}
//Next Song
function nextSong(){
    songIndex++;
    //if the song index is GREATER than 2 (length of song list is 3 then - 1 making 2)
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }

    loadsong(songs[songIndex]);
    playSong();    
}

//update progress bar
function updateProgress(event){
    const {duration, currentTime} = event.srcElement;
    const progressPercent = (currentTime /duration) *100;
    
    progress.style.width = `${progressPercent}%`;
}

//set progress bar
function setProgress(event){
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX /width) *duration;
}



//Event Listeners
playBtn.addEventListener("click", () =>{
    const isPlaying = musicContainer.classList.contains("play");
    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }
})

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update event
audio.addEventListener("timeupdate", updateProgress);

// click on progress bar

progressContainer.addEventListener("click", setProgress);

//song ends
audio.addEventListener("ended", nextSong);