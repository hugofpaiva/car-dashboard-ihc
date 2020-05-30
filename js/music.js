var radio = true;

var playing = {
  name: "RFM",
  artist: "Bad Karma",
  image: "./img/music/radio/rfm.png",
  time: "3:06",
  timee: 306
};
sessionStorage.setItem("actualmusic", playing);

var musicDetail = [
  {
    name: "Club Tropicana",
    artist: "Wham!",
    image: "./img/music/albums/wham.jpg",
    time: "4:25",
    timee: 425
  },
  {
    name: "Last Christmas",
    artist: "Wham!",
    image: "./img/music/albums/wham.jpg",
    time: "4:24",
    timee: 424
  },
  {
    name: "Feels Like Home",
    artist: "The Him",
    image: "./img/music/albums/thehim.jpg",
    time: "3:04",
    timee: 304
  },
  {
    name: "Summer",
    artist: "Calvin Harris",
    image: "./img/music/albums/summer.png",
    time: "3:42",
    timee: 342
  },
  {
    name: "Feeling Good",
    artist: "Avicii",
    image: "./img/music/albums/fgood.jpg",
    time: "3:50",
    timee: 350
  },
  {
    name: "The Nights",
    artist: "Avicii",
    image: "./img/music/albums/nights.jpg",
    time: "2:56",
    timee: 256
  },
  {
    name: "24k Magic",
    artist: "Bruno Mars",
    image: "./img/music/albums/24.jpg",
    time: "3:46",
    timee: 346
  },
  {
    name: "Chunky",
    artist: "Bruno Mars",
    image: "./img/music/albums/24.jpg",
    time: "3:07",
    timee: 307
  },
  {
    name: "That's What I Like",
    artist: "Bruno Mars",
    image: "./img/music/albums/24.jpg",
    time: "3:27",
    timee: 327
  },
  {
    name: "Greyhound",
    artist: "Swedish House Mafia",
    image: "./img/music/albums/greyhound.jpg",
    time: "6:50",
    timee: 650
  },
  {
    name: "Leave The World Behind",
    artist: "Axwell",
    image: "./img/music/albums/leavetheworldbehind.jpg",
    time: "6:50",
    timee: 650
  },
  {
    name: "Reload",
    artist: "Sebastian Ingrosso",
    image: "./img/music/albums/reload.jpg",
    time: "6:00",
    timee: 600
  },
  {
    name: "Don't You Worry Child",
    artist: "Swedish House Mafia",
    image: "./img/music/albums/child.jpg",
    time: "6:43",
    timee: 643
  },
  {
    name: "Goodbye Yellow Brick Road",
    artist: "Elton John",
    image: "./img/music/albums/yellow.jpg",
    time: "3:12",
    timee: 312
  },
  {
    name: "Tiny Dancer",
    artist: "Elton John",
    image: "./img/music/albums/tiny.jpg",
    time: "6:17",
    timee: 617
  },
];

var radioDetail = [
  {
    name: "RFM",
    artist: "Bad Karma",
    image: "./img/music/radio/rfm.png",
    time: "3:06",
    timee: 306
  },
  {
    name: "Mega Hits",
    artist: "Feels Like Summer",
    image: "./img/music/radio/mega.jpg",
    time: "3:06",
    timee: 506
  },
  {
    name: "Antena 3",
    artist: "Billie Jean",
    image: "./img/music/radio/antena3.png",
    time: "4:06",
    timee: 406
  },
  {
    name: "Comercial",
    artist: "Beat It",
    image: "./img/music/radio/comercial.png",
    time: "6:06",
    timee: 606
  },
  {
    name: "M80",
    artist: "Bohemian Rapsody",
    image: "./img/music/radio/m80.jpg",
    time: "7:06",
    timee: 706
  },
  {
    name: "Cidade FM",
    artist: "Gucci Gang",
    image: "./img/music/radio/cidade.png",
    time: "3:06",
    timee: 306
  },
  {
    name: "Smooth FM",
    artist: "Take Me To The River",
    image: "./img/music/radio/smooth.jpg",
    time: "4:06",
    timee: 406
  },
  {
    name: "TSF",
    artist: "Club Tropicana",
    image: "./img/music/radio/tsf.png",
    time: "5:06",
    timee: 506
  },
];

var playing = sessionStorage.getItem("actualmusic");

function music() {
  radio = true;
  document.getElementById("musics-inject").innerHTML = radioDetail
    .map(
      (music) =>
        `<div
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
}

function bluetooth() {
  radio = false;
  document.getElementById("musics-inject").innerHTML = musicDetail
    .map(
      (music) =>
        `<div
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

function change(el) {
  if (!radio) {
    document.getElementById("musics-inject").innerHTML = musicDetail
      .filter((music) =>
        music.name.toLowerCase().includes(el.value.toLowerCase())
      )
      .map(
        (music) =>
          `<div
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
  } else {
    document.getElementById("musics-inject").innerHTML = radioDetail
      .filter((music) =>
        music.name.toLowerCase().includes(el.value.toLowerCase())
      )
      .map(
        (music) =>
          `<div
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
  }
}
