let i = 0;

while (i < sortedlist.length) {
  const n = sortedlist[i];
  const name = n.substr(0, n.length - 6);
  var picname = n.substr(0, n.length - 6);
  if (picname.includes("?")) {
    picname = picname.replace("?", "!");
  }
  const g1 = n.substr(n.length - 3, 1);
  const g2 = n.substr(n.length - 2, 1);
  const g3 = n.substr(n.length - 1, 1);
  const sn = n.charAt(n.length - 5);
  if (name.length < 50) {
    const result = `<li><img src="Posters/${picname}.png" onmouseenter="play(music${i})" onmouseleave="stop(music${i})" alt="${name}" id="${i}"><a href="Series/${picname}.html" target="_blank"><h2>${name}</h2></a>
                        <p>Seasons: ${sn}</p><p>Genres:&nbsp ${genre[g1]}&nbsp ${genre[g2]}&nbsp ${genre[g3]}</p></li>`;
    document.querySelector(".series").innerHTML += result;
  } else {
    const result = `<li><img src="Posters/${picname}.png" onmouseenter="play(music${i})" onmouseleave="stop(music${i})" alt="${name}" id="${i}"><a href="Series/${picname}.html" target="_blank"><h2 style="font-size: 30px;">${name}</h2></a>
                        <p>Seasons: ${sn}</p><p>Genres:&nbsp ${genre[g1]}&nbsp ${genre[g2]}&nbsp ${genre[g3]}</p></li>`;
    document.querySelector(".series").innerHTML += result;
  }
  window["music" + i] = document.getElementById(`${name}`);
  function play(music) {
    var play = music.play();
    play.catch((e) => {
      console.log("Click to Play -- " + e);
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
    const series = document.querySelector(".series");
    series.classList.toggle("blur-out");
    isFirstClick = false;
  }
}
document.addEventListener("click", onFirstClick);
