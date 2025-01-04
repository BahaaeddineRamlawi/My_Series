document.addEventListener("keydown", function (event) {
  const activeElement = document.activeElement;
  const isSearchInput = activeElement.id === "searchInput";
  const isClickableElement =
    activeElement.tagName === "BUTTON" || activeElement.tagName === "A";
  console.log(event.key);

  if (event.key === " " && isClickableElement && !isSearchInput) {
    event.preventDefault();
  }

  if (event.key === "Enter" && !isSearchInput) {
    event.preventDefault();
  }
});

let i = 0;
let initialMusic;
let currentMusic = null;
let initialMusicPosition = 0;
let isMuted = false;
let isSearch = false;
let isPlayingBackgroundMusic = true;

window.addEventListener("load", () => {
  const musicOptions = ["initialMusic1", "initialMusic2", "initialMusic3"];
  const randomIndex = Math.floor(Math.random() * musicOptions.length);
  const selectedMusicId = musicOptions[randomIndex];
  initialMusic = document.getElementById(selectedMusicId);
  if (initialMusic) {
    playinitial(initialMusic);
  }
});

function playinitial(musicElement) {
  musicElement.play();
}

for (const [key, value] of Object.entries(sortedSeriesData)) {
  const seriesName = key;
  var picname = value.name;
  const status = value.status;
  const sn = value.seasonsWatched;
  const g1 = value.genreChars[0];
  const g2 = value.genreChars[1];
  const g3 = value.genreChars[2];

  const result = `<li>
                    <img src="Posters/${picname}.png" onmouseenter="play(music${i})" onmouseleave="restoreInitialMusic()" alt="${seriesName}" id="${i}">
                    <a href="series.html?series_name=${encodeURIComponent(
                      seriesName
                    )}" target="_blank">
                      <h2${
                        seriesName.length < 50
                          ? ""
                          : ' style="font-size: 30px;"'
                      }>${seriesName}</h2>
                    </a>
                    <p>Seasons: ${sn}</p>
                    <p>Genres:&nbsp ${genre[g1]}&nbsp ${genre[g2]}&nbsp ${
    genre[g3]
  }</p>
                    <p>Status: <span>${status}</span></p>
                  </li>`;
  document.querySelector(".series").innerHTML += result;

  window["music" + i] = document.getElementById(`${seriesName}`);
  i++;
}

function play(music) {
  if (currentMusic) {
    stop(currentMusic);
  }
  currentMusic = music;
  if (currentMusic) {
    var play = currentMusic.play();
    play.catch((e) => {
      console.log("Click to Play -- " + e);
    });
  }
}

function stop(music) {
  if (music) {
    music.pause();
    if (music === initialMusic) {
      initialMusicPosition = music.currentTime;
    }
  }
}

function restoreInitialMusic() {
  if (initialMusic && isPlayingBackgroundMusic) {
    initialMusic.currentTime = initialMusicPosition;
    play(initialMusic);
  }
}

let isFirstClick = true;
function onFirstClick(event) {
  if (isFirstClick) {
    const series = document.querySelector(".home-screen-blur");
    series.classList.toggle("blur-out");
    isFirstClick = false;
  }
}

document.addEventListener("click", onFirstClick);

document.addEventListener("DOMContentLoaded", () => {
  const muteButton = document.getElementById("muteButton");
  const muteIcon = document.getElementById("muteIcon");
  const unmuteIcon = document.getElementById("unmuteIcon");
  const pauseButton = document.getElementById("pauseButton");
  const pauseIcon = document.getElementById("pauseIcon");
  const playIcon = document.getElementById("playIcon");
  const searchButton = document.getElementById("searchButton");
  const searchIcon = document.getElementById("searchIcon");
  const homeIcon = document.getElementById("homeIcon");
  const seriespage = document.getElementById("seriespage");
  const APISeries = document.getElementById("APISeries");
  const stopMusicButton = document.getElementById("stopMusicButton");
  const audioElements = document.querySelectorAll("audio");

  const toggleMute = () => {
    audioElements.forEach((audio) => {
      audio.volume = isMuted ? 1 : 0;
    });
    isMuted = !isMuted;
    muteIcon.style.display = isMuted ? "none" : "block";
    unmuteIcon.style.display = isMuted ? "block" : "none";
  };

  const toggleSearch = () => {
    isSearch = !isSearch;
    searchIcon.style.display = isSearch ? "none" : "block";
    seriespage.style.display = isSearch ? "none" : "block";
    homeIcon.style.display = isSearch ? "block" : "none";
    APISeries.style.display = isSearch ? "block" : "none";
    const searchInput = document.getElementById("searchInput");

    if (isSearch) {
      searchInput.focus();
    } else {
      searchInput.blur();
    }
  };

  const togglePause = () => {
    if (isPlayingBackgroundMusic) {
      initialMusic.pause();
      pauseIcon.style.display = "none";
      playIcon.style.display = "block";
    } else {
      initialMusic.play().catch((e) => {
        console.log("Click to Play -- " + e);
      });
      pauseIcon.style.display = "block";
      playIcon.style.display = "none";
    }
    isPlayingBackgroundMusic = !isPlayingBackgroundMusic;
  };

  muteButton.addEventListener("click", toggleMute);
  searchButton.addEventListener("click", toggleSearch);
  pauseButton.addEventListener("click", togglePause);

  const seriesElements = document.querySelectorAll(".series img");
  seriesElements.forEach((img, index) => {
    const audio = document.getElementById(img.alt);
    img.addEventListener("mouseenter", () => {
      if (audio) {
        initialMusic.pause();
        audio.play().catch((e) => {
          console.log("Hover to Play -- " + e);
        });
      }
    });
    img.addEventListener("mouseleave", () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        if (isPlayingBackgroundMusic) {
          initialMusic.play().catch((e) => {
            console.log("Click to Play -- " + e);
          });
        }
      }
    });
  });

  if (initialMusic) {
    initialMusic.play().catch((e) => {
      console.log("Click to Play -- " + e);
    });
  }
});
