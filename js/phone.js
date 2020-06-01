var contacts = [
  ["./img/pedro.jpg", "Pedro"],
  ["./img/fabiana.jpg", "Fabiana"],
  ["./img/alberto.jpg", "Alberto"],
  ["./img/alfredo.jpeg", "Alfredo"],
  ["./img/ana.png", "Ana"],
  ["./img/adriana.jpeg", "Adriana"],
  ["./img/jose.jpeg", "José"],
  ["./img/liliana.jpg", "Liliana"],
];

var TIMERPHONE;

var recentcalls = [
  ["./img/pedro.jpg", "Pedro", "yesterday"],
  ["./img/fabiana.jpg", "Fabiana", "yesterday"],
  ["./img/alberto.jpg", "Alberto", "yesterday"],
  ["./img/alfredo.jpeg", "Alfredo", "today"],
];

function phone() {
  showRecents();
}

function getContact(name) {
  for (i = 0; i < contacts.length; i++) {
    if (contacts[i][1] == name) {
      return contacts[i];
    }
  }
}
function makeCall() {
  bar = document.getElementById("telNumber");
  num = bar.innerHTML;
  showCall(num);
}

function showCall(name) {
  var box = document.getElementById("recentbox");
  box.innerHTML = "";
  box.style.display = "none";

  var numpad = document.getElementById("numPad");
  numpad.style.display = "none";

  var call = document.getElementById("callbox");
  call.style.display = "flex";
  call.innerHTML = "";

  if (isNaN(name)) {
    contact = getContact(name);
  } else {
    contact = ["./img/empty.jpg", name];
  }

  var image = document.createElement("img");
  image.id = "callimg";
  image.style.width = "200px";
  image.style.height = "200px";
  image.style.marginBottom = "35px";
  image.style.borderRadius = "9999em";

  image.src = contact[0];

  var namediv = document.createElement("div");
  namediv.id = "callname";
  namediv.innerHTML = contact[1];
  namediv.style = "font-weight: bold; font-size: 1.7vw; height: 10%;";

  var timediv = document.createElement("div");
  timediv.innerHTML = "00:00";
  timediv.id = "phonetime";
  if (typeof TIMERPHONE === "undefined" || TIMERPHONE === null) {
    TIMERPHONE = setInterval(phoneTime, 1000);
  } else {
    clearInterval(TIMERPHONE);
    TIMERPHONE = setInterval(phoneTime, 1000);
  }

  timediv.style =
    "font-weight: bold; font-size: 1.2vw; color: lightgray height: 5%; margin-bottom: 35px;";

  var icon = document.createElement("img");
  icon.width = "60";
  icon.height = "60";
  icon.id = "call";
  icon.src = "./img/call2.png";
  icon.onclick = endCall;

  call.appendChild(image);
  call.appendChild(namediv);
  call.appendChild(timediv);
  call.appendChild(icon);
}

function endCall() {
  var image = document.getElementById("callimg");
  var name = document.getElementById("callname");

  var call = document.getElementById("callbox");
  call.style.display = "none";

  recentcalls.push([image.src, name.innerHTML, "today"]);

  showRecents();
}

function showRecents() {
  var box = document.getElementById("recentbox");
  box.innerHTML = "";
  box.style.display = "flex";

  var numpad = document.getElementById("numPad");
  numpad.style.display = "none";

  for (i = recentcalls.length - 1; i > -1; i--) {
    var row = document.createElement("div");
    row.style =
      "width: 100%; height:15%; display: flex; justify-content: space-evenly; flex-direction: row;";
    row.id = recentcalls[i][1];
    row.setAttribute('onclick','showCall(this.id)')

    var div1 = document.createElement("div");
    div1.style = "width: 40%; display:flex; justify-content: flex-end;";

    var div2 = document.createElement("div");
    div2.style =
      "width: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center;";

    var image = document.createElement("img");
    image.width = "80";
    image.height = "80";
    image.style.borderRadius = "9990em";
    image.src = recentcalls[i][0];

    var nome = document.createElement("div");
    nome.style = "font-weight: bold; font-size: larger;";
    nome.height = "20";
    nome.innerHTML = recentcalls[i][1];

    var date = document.createElement("div");
    date.style =
      "color: lightgray; font-size: x-small; text-transform: uppercase";
    date.height = "10";
    date.innerHTML = recentcalls[i][2];

    box.appendChild(row);
    row.appendChild(div1);
    row.appendChild(div2);
    div1.appendChild(image);
    div2.appendChild(nome);
    div2.appendChild(date);
  }

  var ic1 = document.getElementById("ic1");
  var ic2 = document.getElementById("ic2");
  var ic3 = document.getElementById("ic3");
  ic1.src = "./img/wall-clockb.png";
  ic2.src = "./img/buttons.png";
  ic3.src = "./img/maps-and-flags.png";
}

function showNum() {
  var recent = document.getElementById("recentbox");
  recent.style.display = "none";

  var callbox = document.getElementById("callbox");
  callbox.style.display = "none";

  var numpad = document.getElementById("numPad");
  numpad.style.display = "flex";

  var bar = document.getElementById("telNumber");
  bar.innerHTML = "";

  var ic1 = document.getElementById("ic1");
  var ic2 = document.getElementById("ic2");
  var ic3 = document.getElementById("ic3");
  ic1.src = "./img/wall-clock.png";
  ic2.src = "./img/buttonsb.png";
  ic3.src = "./img/maps-and-flags.png";
}

function showSos() {
  showNum();
  var bar = document.getElementById("telNumber");
  bar.innerHTML = "112";

  var ic1 = document.getElementById("ic1");
  var ic2 = document.getElementById("ic2");
  var ic3 = document.getElementById("ic3");
  ic1.src = "./img/wall-clock.png";
  ic2.src = "./img/buttons.png";
  ic3.src = "./img/maps-and-flagsb.png";
}

function showContacts(element) {
  var pad = document.getElementById("letterpad");
  pad.style.display = "none";

  var cbox4 = document.getElementById("contactbox");
  cbox4.style.display = "flex";

  var cbox1 = document.createElement("div");
  cbox1.classList.add("cbox");
  cbox1.style.width = "100%";
  cbox1.style.height = "100%";

  document.getElementById("contactbox1").appendChild(cbox1);

  var letter = element.innerHTML;

  var letter_contacts = [];

  for (i = 0; i < contacts.length; i++) {
    if (contacts[i][1].substring(0, 1) === letter.trim()) {
      letter_contacts.push(contacts[i]);
    }
  }

  if (letter_contacts.length == 0) {
    var row = document.createElement("div");
    row.style =
      "width: 100%; height:15%; display: flex; justify-content: center; flex-direction: row; padding-top: 20px";

    var txt = document.createElement("div");
    txt.height = "50";
    txt.innerHTML = "No Contacts to show...";

    cbox1.appendChild(row);
    row.appendChild(txt);

    var div4 = document.createElement("div");
    div4.style =
      "width: 100%; height:15%; display: flex; justify-content: flex-end; align-items: center;";
    div4.onclick = showPad;
  }

  for (i = 0; i < letter_contacts.length; i++) {
    var row = document.createElement("div");
    row.style =
      "width: 100%; height:15%; display: flex; justify-content: space-around; flex-direction: row; padding-top: 20px";

    var div1 = document.createElement("div");
    div1.style = "width: 25%; display:flex; justify-content:center";

    var div2 = document.createElement("div");
    div2.style =
      "width: 25%; display: flex; align-items: center; text-align center; vertical-align: middle; font-weight:bold; font-size:larger";

    var div3 = document.createElement("div");
    div3.style = "width: 15%; display: flex; align-items: center; ";
    div3.id = "call";

    var image = document.createElement("img");
    image.style = "border-radius:9999em";
    image.width = "75";
    image.height = "75";
    image.src = letter_contacts[i][0];

    var nome = document.createElement("div");
    nome.height = "20";
    nome.innerHTML = letter_contacts[i][1];

    var symbol = document.createElement("img");
    symbol.src = "./img/call.png";
    symbol.width = "60";
    symbol.height = "60";
    symbol.id = letter_contacts[i][1];
    symbol.setAttribute("onclick", "showCall(this.id)");

    cbox1.appendChild(row);
    row.appendChild(div1);
    row.appendChild(div2);
    row.appendChild(div3);
    div1.appendChild(image);
    div2.appendChild(nome);
    div3.appendChild(symbol);
  }
}

function showPad() {
  var pad = document.getElementById("letterpad");
  pad.style.display = "flex";

  var cbox = document.getElementById("contactbox");
  cbox.style.display = "none";
  document.getElementById("contactbox1").innerHTML = "";
}

function clickNum(num) {
  bar = document.getElementById("telNumber");
  if (num == "<") {
    bar.innerHTML = bar.innerHTML.slice(0, -1);
  } else {
    if (bar.innerHTML.length < 9) {
      bar.innerHTML = bar.innerHTML + num;
    }
  }
}

function phoneTime() {
  var phoneetime = document.getElementById("phonetime");
  if (document.getElementById("callbox").style.display == "none") {
    clearInterval(TIMERPHONE);
  } else {
    var timeeeee = phoneetime.innerHTML.split(":");
    var minutes = parseInt(timeeeee[0]);
    var seconds = parseInt(timeeeee[1]);
    if (seconds == 59) {
      minutes++;
      seconds = 0;
    } else {
      seconds++;
    }
    if (String(minutes).length < 2) {
      minutes = "0" + minutes;
    }
    if (String(seconds).length < 2) {
      seconds = "0" + seconds;
    }
    phoneetime.innerHTML = minutes + ":" + seconds;
  }
}

function initialPhone() {
  if (JSON.parse(sessionStorage.getItem("connected"))) {
    document.getElementById("phoneswup").style.display = "flex";
    phone();
  } else {
    document.getElementById("phoneswup").style.display = "none";
    showWarning("Please connect a phone on bluetooth settings");
  }
}
