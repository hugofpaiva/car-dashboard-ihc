var radio = true;

sessionStorage.setItem("volume", "80");

var playing = {
  name: "RFM",
  artist: "Bad Karma",
  image: "./img/music/radio/rfm.png",
  time: "3:06",
};

sessionStorage.setItem("connected", JSON.stringify(false));
sessionStorage.setItem("actualmusic", JSON.stringify(playing));
sessionStorage.setItem("changeplay", JSON.stringify(true));

var musicDetail = [
  {
    name: "Club Tropicana",
    artist: "Wham!",
    image: "./img/music/albums/wham.jpg",
    time: "4:25",
    timee: 425,
  },
  {
    name: "Last Christmas",
    artist: "Wham!",
    image: "./img/music/albums/wham.jpg",
    time: "4:24",
    timee: 424,
  },
  {
    name: "Feels Like Home",
    artist: "The Him",
    image: "./img/music/albums/thehim.jpg",
    time: "3:04",
    timee: 304,
  },
  {
    name: "Summer",
    artist: "Calvin Harris",
    image: "./img/music/albums/summer.png",
    time: "3:42",
    timee: 342,
  },
  {
    name: "Feeling Good",
    artist: "Avicii",
    image: "./img/music/albums/fgood.jpg",
    time: "3:50",
    timee: 350,
  },
  {
    name: "The Nights",
    artist: "Avicii",
    image: "./img/music/albums/nights.jpg",
    time: "2:56",
    timee: 256,
  },
  {
    name: "24k Magic",
    artist: "Bruno Mars",
    image: "./img/music/albums/24.jpg",
    time: "3:46",
    timee: 346,
  },
  {
    name: "Chunky",
    artist: "Bruno Mars",
    image: "./img/music/albums/24.jpg",
    time: "3:07",
    timee: 307,
  },
  {
    name: "That's What I Like",
    artist: "Bruno Mars",
    image: "./img/music/albums/24.jpg",
    time: "3:27",
    timee: 327,
  },
  {
    name: "Greyhound",
    artist: "Swedish House Mafia",
    image: "./img/music/albums/greyhound.jpg",
    time: "6:50",
    timee: 650,
  },
  {
    name: "Leave The World Behind",
    artist: "Axwell",
    image: "./img/music/albums/leavetheworldbehind.jpg",
    time: "6:50",
    timee: 650,
  },
  {
    name: "Reload",
    artist: "Sebastian Ingrosso",
    image: "./img/music/albums/reload.jpg",
    time: "6:00",
    timee: 600,
  },
  {
    name: "Don't You Worry Child",
    artist: "Swedish House Mafia",
    image: "./img/music/albums/child.jpg",
    time: "6:43",
    timee: 643,
  },
  {
    name: "Goodbye Yellow Brick Road",
    artist: "Elton John",
    image: "./img/music/albums/yellow.jpg",
    time: "3:12",
    timee: 312,
  },
  {
    name: "Tiny Dancer",
    artist: "Elton John",
    image: "./img/music/albums/tiny.jpg",
    time: "6:17",
    timee: 617,
  },
];

var radioDetail = [
  {
    name: "RFM",
    artist: "Bad Karma",
    image: "./img/music/radio/rfm.png",
    time: "3:06",
    timee: 306,
  },
  {
    name: "Mega Hits",
    artist: "Feels Like Summer",
    image: "./img/music/radio/mega.jpg",
    time: "3:06",
    timee: 506,
  },
  {
    name: "Antena 3",
    artist: "Billie Jean",
    image: "./img/music/radio/antena3.png",
    time: "4:06",
    timee: 406,
  },
  {
    name: "Comercial",
    artist: "Beat It",
    image: "./img/music/radio/comercial.png",
    time: "6:06",
    timee: 606,
  },
  {
    name: "M80",
    artist: "Bohemian Rapsody",
    image: "./img/music/radio/m80.jpg",
    time: "7:06",
    timee: 706,
  },
  {
    name: "Cidade FM",
    artist: "Gucci Gang",
    image: "./img/music/radio/cidade.png",
    time: "3:06",
    timee: 306,
  },
  {
    name: "Smooth FM",
    artist: "Take Me To The River",
    image: "./img/music/radio/smooth.jpg",
    time: "4:06",
    timee: 406,
  },
  {
    name: "TSF",
    artist: "Club Tropicana",
    image: "./img/music/radio/tsf.png",
    time: "5:06",
    timee: 506,
  },
];

var playing = JSON.parse(sessionStorage.getItem("actualmusic"));

function music() {
  radio = true;
  try {
    document.getElementById("musics-inject").innerHTML = radioDetail
      .map(
        (music) =>
          `<div onclick="clickMusic(this)"
      style="height:105px; width: 100%; border-top: 2px solid rgba(255, 255, 255, 0.452); display: flex; justify-content: flex-start; align-items: center; margin-top:5px; margin-bottom:5px">
      <img src="${music.image}" width="80px" height="80px">
      <div style="width: 65%; display: flex; align-items: center; justify-content: space-between;">
          <div style="width:72.5%; margin-left: 5px">
              <p style="font-size:small; font-weight: bold; ">${music.name}</p>
              <p style="font-size:small">${music.artist}</p>
          </div>
          <div style="width:12.5%; display:flex; justify-content: flex-end;">
          <p style="font-size: small; margin-right: 5px;"></p>
          </div>
      </div>
  </div>
`
      )
      .join("");
  } catch {}
}

function bluetooth() {
  if (!JSON.parse(sessionStorage.getItem("connected"))) {
    showWarning("Please connect a bluetooth device on settings");
  } else {
    radio = false;
    document.getElementById("musics-inject").innerHTML = musicDetail
      .map(
        (music) =>
          `<div onclick="clickMusic(this)"
      style="height:105px; width: 100%; border-top: 2px solid rgba(255, 255, 255, 0.452); display: flex; justify-content: flex-start; align-items: center; margin-top:5px; margin-bottom:5px">
      <img src="${music.image}" width="80px" height="80px">
      <div style="width: 65%; display: flex; align-items: center; justify-content: space-between;">
          <div style="width:72.5%; margin-left: 5px">
              <p style="font-size:small; font-weight: bold; ">${music.name}</p>
              <p style="font-size:small">${music.artist}</p>
          </div>
          <div style="width:12.5%; display:flex; justify-content: flex-end;">
          <p style="font-size: small; margin-right: 5px;">${music.time}</p>
          </div>
      </div>
  </div>
`
      )
      .join("");
  }
}

function change(el) {
  if (!radio) {
    document.getElementById("musics-inject").innerHTML = musicDetail
      .filter((music) =>
        music.name.toLowerCase().includes(el.value.toLowerCase())
      )
      .map(
        (music) =>
          `<div onclick="clickMusic(this)"
      style="height:105px; width: 100%; border-top: 2px solid rgba(255, 255, 255, 0.452); display: flex; justify-content: space-between; align-items: center; margin-top:5px; margin-bottom:5px">
      <img src="${music.image}" width="80px" height="80px">
      <div style="width: 65%; display: flex; align-items: center; justify-content: space-between;">
          <div style="width:72.5%; margin-left: 5px">
              <p style="font-size:small; font-weight: bold; ">${music.name}</p>
              <p style="font-size:small">${music.artist}</p>
          </div>
          <div style="width:12.5%; display:flex; justify-content: flex-end;">
          <p style="font-size: small; margin-right: 5px;">${music.time}</p>
          </div>
      </div>
  </div>`
      )
      .join("");
  } else {
    document.getElementById("musics-inject").innerHTML = radioDetail
      .filter((music) =>
        music.name.toLowerCase().includes(el.value.toLowerCase())
      )
      .map(
        (music) =>
          `<div onclick="clickMusic(this)"
      style="height:105px; width: 100%; border-top: 2px solid rgba(255, 255, 255, 0.452); display: flex; justify-content: space-between; align-items: center; margin-top:5px; margin-bottom:5px">
      <img src="${music.image}" width="80px" height="80px">
      <div style="width: 65%; display: flex; align-items: center; justify-content: space-between;">
          <div style="width:72.5%; margin-left: 5px">
              <p style="font-size:small; font-weight: bold; ">${music.name}</p>
              <p style="font-size:small">${music.artist}</p>
          </div>
          <div style="width:12.5%; display:flex; justify-content: flex-end;">
          <p style="font-size: small; margin-right: 5px;"></p>
          </div>
      </div>
  </div>`
      )
      .join("");
  }
}

function playM() {
  var playing = JSON.parse(sessionStorage.getItem("actualmusic"));

  document.getElementById("music").innerHTML = playing.name;
  document.getElementById("mname").innerHTML = playing.name;
  document.getElementById("martist").innerHTML = playing.artist;
  if (document.getElementById("malbum") != null) {
    document.getElementById("malbum").src = playing.image;
  } else {
    document.getElementsByClassName(
      "music"
    )[0].style.backgroundImage = `url(${playing.image})`;
  }
}

function clickMusic(el) {
  var image = el.children[0].src;
  var name = el.children[1].children[0].children[0].innerHTML;
  var artist = el.children[1].children[0].children[1].innerHTML;
  var playing = {
    name: name,
    artist: artist,
    image: image,
  };
  sessionStorage.setItem("actualmusic", JSON.stringify(playing));
  playM();
}

function changePlay() {
  if (JSON.parse(sessionStorage.getItem("changeplay"))) {
    document.getElementById("changePlay").src = "./img/music/controls/play.svg";
    sessionStorage.setItem("changeplay", JSON.stringify(false));
  } else {
    document.getElementById("changePlay").src =
      "./img/music/controls/pause.svg";
    sessionStorage.setItem("changeplay", JSON.stringify(true));
  }
}

function checkPlay() {
  if (JSON.parse(sessionStorage.getItem("changeplay"))) {
    document.getElementById("changePlay").src =
      "./img/music/controls/pause.svg";
  } else {
    document.getElementById("changePlay").src = "./img/music/controls/play.svg";
  }
}

function nextMusic() {
  var playing = JSON.parse(sessionStorage.getItem("actualmusic"));
  var flag = false;
  var found = -1;
  found = radioDetail.findIndex((element) => element.name == playing.name);
  if (found == -1) {
    found = musicDetail.findIndex((element) => element.name == playing.name);
    flag = true;
  }

  if (!flag) {
    if (found + 1 == radioDetail.length) {
      var playing = radioDetail[0];
    } else {
      var playing = radioDetail[found + 1];
    }
  } else {
    if (found + 1 == musicDetail.length) {
      var playing = musicDetail[0];
    } else {
      var playing = musicDetail[found + 1];
    }
  }

  sessionStorage.setItem("actualmusic", JSON.stringify(playing));
  playM();
}

function previousMusic() {
  var playing = JSON.parse(sessionStorage.getItem("actualmusic"));
  var flag = false;
  var found = -1;
  found = radioDetail.findIndex((element) => element.name == playing.name);
  if (found == -1) {
    found = musicDetail.findIndex((element) => element.name == playing.name);
    flag = true;
  }

  if (!flag) {
    if (found == 0) {
      var playing = radioDetail[radioDetail.length - 1];
    } else {
      var playing = radioDetail[found - 1];
    }
  } else {
    if (found == 0) {
      var playing = musicDetail[musicDetail.length - 1];
    } else {
      var playing = musicDetail[found - 1];
    }
  }

  sessionStorage.setItem("actualmusic", JSON.stringify(playing));
  playM();
}

function volume(el) {
  sessionStorage.setItem("volume", el.value);
  if (el.value > 1) { // por algum motivo o slider só permite meter no mínimo 1
    sessionStorage.setItem("oldvolume", el.value);
    try {
      document.getElementById("music-toggle").src = "./img/music/controls/sound.svg";
    } catch {}
  } else if (el.value == 1){
    try {
      document.getElementById("music-toggle").src = "./img/music/controls/nosound.svg";
    } catch {}
  }
  console.log(el.value);
  changeVolume();
}
function changeVolume() {
  var volume = sessionStorage.getItem("volume");

  try {
    document.getElementById("volume1").value = volume;
  } catch {}

  try {
    document.getElementById("volume2").value = volume;
  } catch {}
}

function noVolume(el) {
  var volume = sessionStorage.getItem("volume");
  if (parseInt(volume) > 1) {
    el.src = "./img/music/controls/nosound.svg";
    sessionStorage.setItem("oldvolume", volume);
    sessionStorage.setItem("volume", "0");
  } else {
    el.src = "./img/music/controls/sound.svg";
    sessionStorage.setItem("volume", sessionStorage.getItem("oldvolume"));
  }
  changeVolume();
}
