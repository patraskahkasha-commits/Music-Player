
const songs = [
  {
    title: "Download Song",
    artist: "Asim_Azhar",
    src: "song1.mp3",
    cover: "ost.jpg"
  },
  {
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    src: "song2.mp3",
    cover: "https://picsum.photos/seed/song2/300/300"
  },
  {
    title: "Agar Tum Saath Ho",
    artist: "Arijit Singh",
    src: "song3.mp3",
    cover: "https://picsum.photos/seed/song3/300/300"
  }
];

// ---- Elements ----
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volumeSlider");
const playlistEl = document.getElementById("playlist");

let songIndex = 0;
let isPlaying = false;

// ---- Load a song ----
function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  highlightActiveSong(index);
}

// ---- Play / Pause ----
function playSong() {
  isPlaying = true;
  playBtn.textContent = "⏸";
  audio.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.textContent = "▶";
  audio.pause();
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// ---- Next / Prev ----
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audio.addEventListener("ended", nextSong);

// ---- Progress bar ----
audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  if (duration) {
    progress.style.width = `${(currentTime / duration) * 100}%`;
    currentTimeEl.textContent = formatTime(currentTime);
  }
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// ---- Volume ----
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// ---- Playlist ----
function renderPlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} — ${song.artist}`;
    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(songIndex);
      playSong();
    });
    playlistEl.appendChild(li);
  });
}

function highlightActiveSong(index) {
  const items = playlistEl.querySelectorAll("li");
  items.forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });
}

// ---- Init ----
renderPlaylist();
loadSong(songIndex);