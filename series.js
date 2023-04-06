const list = ["Agent Carter-2-sad","Archive81-1-mdh","Band of Brothers-1-wda","Dark-3-tmd","Ginny & Georgia-2-cdv","Grand Army-1-kdv",
        "Halo-1-sae","Hawkeye-1-cab","House of Dragons-1-fda","I Am Groot-1-scv","iCarly-2-ocv","La Casa De Papel-5-iab",
        "Locke and Key-3-hdm","Loki-1-etf","MacGyver-5-eav","Moon Knight-1-aef","Ms. Marvel-1-eca","Prison Break-5-amt",
        "Reacher-1-atc","Resident Evil-1-ahd","Scream Queens-2-hcd","She-Hulk Attorney at Law-1-ecd","Stay Close-1-mbt",
        "The Falcon And The Winter Soldier-1-cea","The Flight Attendant-2-mct","The Last Of Us-1-aew","The Outsider-1-hbm",
        "The Punisher-2-bat","The Queen's Gambit-1-dvv","The Terminal List-1-adb","The Witcher Blood Origin-1-fda","The Witcher-2-efd",
        "The Woman In The House Across The Street From The Girl In The Window-1-mtc","Wanda Vision-1-rmd","Wednesday-1-fcm","Y The Last Man-1-dea"]
let i=0;
//"One of Us Is Lying-1-mdt"


const genre = {a:"Action",b:"Crime",c:"Comedy",d:"Drama",e:"Adventure",f:"Fantasy",t:"Thriller",h:"Horror",m:"Mystery",
                s:"Sci-Fi",r:"Romance",w:"War",i:"Heist",o:"Sitcom",k:"Adolescence",v:""}

while(i < list.length) {
        const  n = list[i];
        const name = n.substr(0,n.length-6);
        const g1 = n.substr(n.length-3,1);
        const g2 = n.substr(n.length-2,1);
        const g3 = n.substr(n.length-1,1);
        const sn = n.charAt(n.length-5);
        if (name.length<50) {
                const result = `<li><img src="pics/${name}.png" onmouseenter="play(music${i})" onmouseleave="stop(music${i})" alt="${name}" id="${i}"><h2>${name}</h2>
                        <p>Seasons: ${sn}</p><p>Genres: ${genre[g1]} ${genre[g2]} ${genre[g3]}</p></li>`;
                document.querySelector('.series').innerHTML += result;
        }
        else{
                const result = `<li><img src="pics/${name}.png" onmouseenter="play(music${i})" onmouseleave="stop(music${i})" alt="${name}" id="${i}"><h2 style="font-size: 30px;">${name}</h2>
                                <p>Seasons: ${sn}</p><p>Genres: ${genre[g1]} ${genre[g2]} ${genre[g3]}</p></li>`;
                document.querySelector('.series').innerHTML += result;
        }
        window['music'+i] = document.getElementById(`${name}`);
        function play(music){
                music.play();
        }
        function stop(music){
                music.pause()
                music.currentTime = 0;
        }
        i++;
}