let i = 0;

while (i < sortedList.length) {
  const n = sortedList[i];
  const name = n.name;
  var picname = name;
  if (picname.includes("?")) {
    picname = picname.replace("?", "!");
  }
  const threegenre = n.genre;
  const sn = n.seasons;
  const g1 = threegenre[0];
  const g2 = threegenre[1];
  const g3 = threegenre[2];
  if (name.length < 50) {
    const result = `<li><img src="Posters/${picname}.png" onmouseenter="play(music${i})" onmouseleave="stop(music${i})" alt="${name}" id="${i}"><a href="series.html?series_name=${encodeURIComponent(name)}" target="_blank"><h2>${name}</h2></a>
                        <p>Seasons: ${sn}</p><p>Genres:&nbsp ${genre[g1]}&nbsp ${genre[g2]}&nbsp ${genre[g3]}</p></li>`;
    document.querySelector(".series").innerHTML += result;
  } else {
    const result = `<li><img src="Posters/${picname}.png" onmouseenter="play(music${i})" onmouseleave="stop(music${i})" alt="${name}" id="${i}"><a href="series.html?series_name=${encodeURIComponent(name)}" target="_blank"><h2 style="font-size: 30px;">${name}</h2></a>
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
