const musicC=document.querySelector('#music-container');
const prevBtn=document.getElementById('prev'),
playBtn=document.querySelector('#play'),
nextBtn=document.querySelector('#next'),
audio=document.querySelector('#music'),
progress=document.querySelector('#progress'),
progressContainer=document.querySelector('#progress-container'),
title=document.querySelector('#title'),
cover=document.querySelector('#cover');

//Qo'shiq titles

const songs=["Botir","Doston", "Love"];

let songIndex=0;

// Load Song details

loadSong(songs[songIndex])

//Update Song

function loadSong(song){
title.innerText = song;
audio.src = `./Music/${song}.mp3`;
cover.src = `./Img/${song}.jpg`;
}

//Event Listener
//Play
playBtn.addEventListener('click', () => {
    const isPlaying=musicC.classList.contains("play");

    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
});

//PlaySong Functin

function playSong(){
    musicC.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove("fa-play");
    playBtn.querySelector('i.fas').classList.add("fa-pause");
    audio.play();
}

//Pause Song
function pauseSong(){
    musicC.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add("fa-play");
    playBtn.querySelector('i.fas').classList.remove("fa-pause");
    audio.pause();
}

// Change Song

prevBtn.addEventListener("click", prevSong);



function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex=songs.length-1;
    }
    loadSong(songs[songIndex])
    playSong();
    
}

nextBtn.addEventListener("click", nextSong);

function nextSong(){
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex=0;
    }
    loadSong(songs[songIndex])
    playSong();
}


audio.addEventListener("timeupdate", updateProgress);
function updateProgress(e){
    const {duration, currentTime}=e.srcElement;

    const progressPercent=(currentTime/duration) *100;

    progress.style.width=`${progressPercent}%`;


}

progressContainer.addEventListener("click", setProgress);

function setProgress(e){
    const width=this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width)*duration;
}
