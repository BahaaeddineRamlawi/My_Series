const list = [
  "Anne Rice's Mayfair Witches-2",
  "Ginny & Georgia-3",
  "Halo-2",
  "House of The Dragons-2",
  "Reacher-2",
  "Squid Game-2",
  "The Last Of Us-2",
  "The Witcher-4",
  "Wednesday-2",
  "The Rookie-6",
  "The Peripheral-2",
  "From-3",
  "The Night Agent-2",
];
let i = 0;
const sortedlist = list.sort();

while (i < sortedlist.length) {
  const n = sortedlist[i];
  const name = n.substr(0, n.length - 2);
  const sn = n.charAt(n.length - 1);

  const result = `<li><img src="Posters/${name}.png" onmouseenter="play(music${i})" onmouseleave="stop(music${i})" alt="${name}" id="${i}">
                        <div><h2>${name}</h2><p>Season ${sn}</p></div></li>`;
  document.querySelector(".futureseries").innerHTML += result;
  window["music" + i] = document.getElementById(`${name}`);
  function play(music) {
    var play = music.play();
    play.catch((e) => {
      console.log("Click to Play");
    });
  }
  function stop(music) {
    music.pause();
    music.currentTime = 0;
  }
  i++;
}

let isFirstClick = true;
function onFirstClick(event) {
  if (isFirstClick) {
    const series = document.querySelector(".futureseries");
    series.classList.toggle("blur-out");
    isFirstClick = false;
  }
}
document.addEventListener("click", onFirstClick);
