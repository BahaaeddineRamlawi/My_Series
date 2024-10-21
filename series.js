let i = 0;
let initialMusic;
let currentMusic = null; // Variable to track the currently playing music
let initialMusicPosition = 0; // Variable to track the position of the initial music
let isMuted = false; // Track mute state
let isPlayingBackgroundMusic = true; // Track background music state

// Set up initial music on page load
window.addEventListener("load", () => {
  initialMusic = document.getElementById("initialMusic"); // Set the initial music element
  if (initialMusic) {
    play(initialMusic); // Play the initial music when the page loads
  }
});

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
                    <p>Genres:&nbsp ${genre[g1]}&nbsp ${genre[g2]}&nbsp ${genre[g3]}</p>
                    <p>Status: <span>${status}</span></p>
                  </li>`;
  document.querySelector(".series").innerHTML += result;

  window["music" + i] = document.getElementById(`${seriesName}`);
  i++;
}

// Function to play the given music
function play(music) {
  if (currentMusic) {
    stop(currentMusic); // Stop the currently playing music
  }
  currentMusic = music;
  if (currentMusic) {
    var play = currentMusic.play();
    play.catch((e) => {
      console.log("Click to Play -- " + e);
    });
  }
}

// Function to stop the given music and track position
function stop(music) {
  if (music) {
    music.pause();
    if (music === initialMusic) {
      initialMusicPosition = music.currentTime; // Save the position of the initial music
    }
  }
}

// Function to restore initial music
function restoreInitialMusic() {
  if (initialMusic && isPlayingBackgroundMusic) {
    initialMusic.currentTime = initialMusicPosition; // Resume from the saved position
    play(initialMusic); // Continue playing the initial music
  }
}

// Add blur-out class on the first click
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
  const stopMusicButton = document.getElementById("stopMusicButton");
  const audioElements = document.querySelectorAll("audio"); // Select all audio elements

  // Function to mute or unmute all audio elements
  const toggleMute = () => {
    audioElements.forEach((audio) => {
      audio.volume = isMuted ? 1 : 0; // Set volume to 0 for mute, 1 for unmute
    });
    isMuted = !isMuted;
    muteIcon.style.display = isMuted ? "none" : "block";
    unmuteIcon.style.display = isMuted ? "block" : "none";
  };

  // Function to stop or play background music
  const toggleBackgroundMusic = () => {
    if (isPlayingBackgroundMusic) {
      initialMusic.pause();
      stopMusicButton.textContent = "Play Background Music";
    } else {
      initialMusic.play().catch((e) => {
        console.log("Click to Play -- " + e);
      });
      stopMusicButton.textContent = "Stop Background Music";
    }
    isPlayingBackgroundMusic = !isPlayingBackgroundMusic;
  };

  // Mute button functionality
  muteButton.addEventListener("click", toggleMute);

  // Stop/Play background music button functionality
  stopMusicButton.addEventListener("click", toggleBackgroundMusic);

  // Hover functionality for series audio elements
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
        audio.currentTime = 0; // Reset to the beginning
        if (isPlayingBackgroundMusic) {
          initialMusic.play().catch((e) => {
            console.log("Click to Play -- " + e);
          });
        }
      }
    });
  });

  // Start initial music
  if (initialMusic) {
    initialMusic.play().catch((e) => {
      console.log("Click to Play -- " + e);
    });
  }
});
