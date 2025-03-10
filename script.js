"use stric";

const songList = [
  {
    name: "هایده",
    artist: "شب عید",
    src: "8.Shabe Eid.m4a",
    cover: "photo_9_2025-03-10_23-54-55.jpg",
  },
  {
    name: "مهستی",
    artist: "سپیده دم",
    src: "Mahasti - Sepidedam [320].m4a",
    cover: "photo_7_2025-03-10_23-54-55.jpg",
  },
  {
    name: "شهره",
    artist: "عکساشو پاره کردم",
    src: "24_shohreh_-_aksashow_pareh_kardam.m4a",
    cover: "photo_2_2025-03-10_23-54-55.jpg",
  },
  {
    name: "هایده",
    artist: "ساقی",
    src: "Hayedeh - Saghi [320]_1.m4a",
    cover: "photo_8_2025-03-10_23-54-55.jpg",
  },
  {
    name: "حمیرا",
    artist: "علامه عشق",
    src: "Homeyra-Alame-Ashgh.m4a",
    cover: "photo_11_2025-03-10_23-54-55.jpg",
  },
  {
    name: "مهستی",
    artist: "بیا بنویسم",
    src: "Mahasti - Bia Benevisim [320]_1.m4a",
    cover: "photo_3_2025-03-10_23-54-55.jpg",
  },
  {
    name: "ناهید",
    artist: "سیا نرمه نرمه",
    src: "Ahange Sia Narma Narma [Melodya].m4a",
    cover: "photo_1_2025-03-10_23-54-55.jpg",
  },
  {
    name: "حمیرا",
    artist: "دریا کنار",
    src: "Homeyra-Darya-Kenar.m4a",
    cover: "photo_6_2025-03-10_23-54-55.jpg",
  },
  {
    name: "مهستی",
    artist: "میخونه بی شراب",
    src: "Mahasti - Meykhooneh Bisharabeh [320].m4a",
    cover: "photo_4_2025-03-10_23-54-55.jpg",
  },
  {
    name: "حمیرا",
    artist: "شب پر ستاره",
    src: "Homeyra-Shabeh-Phorsetari.m4a",
    cover: "images.jpg",
  },
];

const artistName = document.querySelector(".artist-name");
const musicName = document.querySelector(".song-name");
const fillBar = document.querySelector(".fill-bar");
const time = document.querySelector(".time");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const prog = document.querySelector(".progress-bar");

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener("DOMContentLoaded", () => {
  loadSong(currentSong);
  song.addEventListener("timeupdate", updateProgress);
  song.addEventListener("ended", nextSong);
  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
  playBtn.addEventListener("click", togglePlayPause);
  prog.addEventListener("click", seek);
});

function loadSong(index) {
  const { name, artist, src, cover: thumb } = songList[index];
  artistName.innerText = artist;
  musicName.innerText = name;
  song.src = src;
  cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
  if (song.duration) {
    const pos = (song.currentTime / song.duration) * 100;
    fillBar.style.width = `${pos}%`;

    const duration = formatTime(song.duration);
    const currentTime = formatTime(song.currentTime);
    time.innerText = `${currentTime} - ${duration}`;
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

function togglePlayPause() {
  if (playing) {
    song.pause();
  } else {
    song.play();
  }
  playing = !playing;

  if (playing) {
    playBtn.classList.add("bx-pause");
    playBtn.classList.remove("bx-play");
  } else {
    playBtn.classList.add("bx-play");
    playBtn.classList.remove("bx-pause");
  }

  cover.classList.toggle("active", playing);
}

function nextSong() {
  currentSong = (currentSong + 1) % songList.length;
  playMusic();
}

function prevSong() {
  currentSong = (currentSong - 1 + songList.length) % songList.length;
  playMusic();
}

function playMusic() {
  loadSong(currentSong);
  song.play();
  playing = true;
  playBtn.classList.add("bx-pause");
  playBtn.classList.remove("bx-play");
  cover.classList.add("active");
}

function seek(e) {
  const pos = (e.offsetX / prog.clientWidth) * song.duration;
  song.currentTime = pos;
}
