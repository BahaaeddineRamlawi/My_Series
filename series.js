const list = [
  "Agent Carter-2-sad",
  "Anne Rice's Mayfair Witches-1-tds",
  "Archive81-1-mdh",
  "Band of Brothers-1-wda",
  "Dark-3-tmd",
  "Ginny & Georgia-2-cdv",
  "Grand Army-1-kdv",
  "Halo-1-sae",
  "Hawkeye-1-cab",
  "House of The Dragons-1-fda",
  "I Am Groot-1-scv",
  "ICarly-3-ocv",
  "Imposters-2-pvv",
  "Jessica Jones-3-dtb",
  "La Casa De Papel-5-iab",
  "Locke & Key-3-hdm",
  "Loki-2-etf",
  "MacGyver-5-eav",
  "Man vs Bee-1-cvv",
  "Moon Knight-1-aef",
  "Mr. Iglesias-3-ocv",
  "Ms. Marvel-1-eca",
  "Prison Break-5-amt",
  "Reacher-2-atc",
  "Resident Evil-1-ahd",
  "Scream Queens-2-hcd",
  "She-Hulk Attorney at Law-1-ecd",
  "Squid Game-1-atu",
  "Stay Close-1-mbt",
  "The Falcon And The Winter Soldier-1-cea",
  "The Flight Attendant-2-mct",
  "The Last Of Us-1-aew",
  "The Outsider-1-hbm",
  "The Punisher-2-bat",
  "The Queen's Gambit-1-dvv",
  "The Terminal List-1-adb",
  "The Wilds-2-dmu",
  "The Witcher Blood Origin-1-fda",
  "The Witcher-3-efd",
  "The Woman In The House Across The Street From The Girl In The Window-1-mtc",
  "United States of Al-2-ocv",
  "Wanda Vision-1-rmd",
  "Wednesday-1-fcm",
  "Y The Last Man-1-dea",
  "Young Sheldon-7-ocd",
  "The Rookie-6-adb",
  "The Boss Baby Back in Business-3-cef",
  "Secret Invasion-1-aes",
  "The Peripheral-1-std",
  "Gotham Knights-1-acd",
  "From-2-hsv",
  "The Lazarus Project-1-sat",
  "Lockwood & Co-1-aeh",
  "The Night Agent-1-atd",
  "Yellowjackets-2-mtu",
  "The Office-9-cov",
  "Black Summer-2-dha",
  "What If...?-2-aes",
  "Love & Death-1-dbv",
  "Night Has Come-1-tmh",
  "Ted-1-cvv",
  "Iron Fist-2-adq",
  "City on Fire-1-cdv",
  "Luke Cage-2-abq",
  "Pyramid Game-1-tum",
  "Daredevil-2-aeb",
  "Monsters at Work-1-cfv",
  "Shōgun-1-dav",
  "The Defenders-1-adq",
  "Black Knight-1-sav",
  "Manhunt-1-tdv",
  "Dead Boy Detectives-1-cdh",
  "Chicken Nugget-1-cmv",
  "See-1-aes",
  "Not Dead Yet-1-ovv",
  "Don't Trust the B---- In Apartment 23-1-ovv"
];
let i = 0;
//"One of Us Is Lying-1-mdt","The Cleaning Lady-1-bdv",
//"1899-1-msh","Pretty Little Liars-1-dmt"

const sortedlist = list.sort();

const genre = {
  a: "Action",
  b: "Crime",
  c: "Comedy",
  d: "Drama",
  e: "Adventure",
  f: "Fantasy",
  t: "Thriller",
  h: "Horror",
  m: "Mystery",
  s: "Sci-Fi",
  r: "Romance",
  w: "War",
  i: "Heist",
  o: "Sitcom",
  k: "Adolescence",
  u: "Survival",
  p: "Dark Comedy",
  q: "Superhero",
  v: "",
};

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
