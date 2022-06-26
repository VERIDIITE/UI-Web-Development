
const container = document.querySelector(".container"),
  musicImg = container.querySelector(".img-area img"),
  musicName = container.querySelector(".song-details .name"),
  musicArtist = container.querySelector(".song-details .artist"),
  mainAudio = container.querySelector("#main-audio"),
  playpauseBtn = container.querySelector(".play-pause"),
  nextBtn = container.querySelector("#next"),
  prevBtn = container.querySelector("#prev"),
  progressArea = container.querySelector(".progress-area"),
  progressBar = container.querySelector(".progress-bar"),
  musicList = container.querySelector(".music-list"),
  moreMusicBtn = container.querySelector("#more-music"),
  closemoreMusic = container.querySelector("#close");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
window.addEventListener("load", () => {
  loadMusic(musicIndex);
  playingSong();
})

function loadMusic(indexNumb) {
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpg`;
  mainAudio.src = `beats/${allMusic[indexNumb - 1].src}.mp3`;
}

function playMusic() {
  container.classList.add("paused");
  playpauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

function pauseMusic() {
  container.classList.remove("paused");
  playpauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}


function nextMusic() {
  musicIndex++;
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}

function prevMusic() {
  musicIndex--;
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}

playpauseBtn.addEventListener("click", () => {
  const isMusicPaused = container.classList.contains("paused");

  isMusicPaused ? pauseMusic() : playMusic();

});

nextBtn.addEventListener("click", () => {
  nextMusic();
});

prevBtn.addEventListener("click", () => {
  prevMusic();
});

mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = container.querySelector(".current-time"),
    musicDuration = container.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", () => {

    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }

    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = mainAudio.duration;

  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic();

});

const repeatBtn = container.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
  let getText = repeatBtn.innerText;
  switch (getText) {
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "playback shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "playlist looped");
      break;
  }

});

moreMusicBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", () => {
  moreMusicBtn.click();
});
