var contacts = [
    ["./img/pedro.jpeg", "Pedro"],
    ["./img/fabiana.jpeg", "Fabiana"],
    ["./img/alberto.jpeg", "Alberto"],
    ["./img/alfredo.jpeg", "Alfredo"],
    ["./img/ana.jpeg", "Ana"],
    ["./img/adriana.jpeg", "Adriana"],
    ["./img/jose.jpeg", "José"],
    ["./img/liliana.jpeg", "Liliana"],
  ];

  var recentcalls = [
    ["./img/pedro.jpeg", "Pedro", "today"],
    ["./img/fabiana.jpeg", "Fabiana", "yesterday"],
    ["./img/alberto.jpeg", "Alberto", "yesterday"],
    ["./img/alfredo.jpeg", "Alfredo", "yesterday"],
  ];

function phone() {
  showRecents()
}

function showRecents(){
  var box = document.getElementById("recentbox");
  box.innerHTML = "";
  box.style.display = "flex"

  var numpad = document.getElementById("numPad");
  numpad.style.display = "none";

  for (i = 0; i < recentcalls.length; i++) {

    var row = document.createElement("div");
    row.style =
      "width: 100%; height:15%; display: flex; justify-content: space-evenly; flex-direction: row;";

    var div1 = document.createElement("div");
    div1.style = "width: 40%;";

    var div2 = document.createElement("div");
    div2.style =
      "width: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center;";

    var image = document.createElement("img");
    image.width = "70";
    image.height = "70";
    image.src = recentcalls[i][0];

    var nome = document.createElement("div");
    nome.height = "20";
    nome.innerHTML = recentcalls[i][1];

    var date = document.createElement("div");
    date.style = "color: lightgray;";
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
  ic1.src = "./img/wall-clockb.png"
  ic2.src = "./img/buttons.png"
  ic3.src = "./img/maps-and-flags.png"
}

function showNum(){
  var recent = document.getElementById("recentbox");
  recent.style.display = "none";

  var numpad = document.getElementById("numPad");
  numpad.style.display = "flex";

  var bar = document.getElementById("telNumber");
  bar.innerHTML = ""

  var ic1 = document.getElementById("ic1");
  var ic2 = document.getElementById("ic2");
  var ic3 = document.getElementById("ic3");
  ic1.src = "./img/wall-clock.png"
  ic2.src = "./img/buttonsb.png"
  ic3.src = "./img/maps-and-flags.png"
}

function showSos(){
  showNum()
  var bar = document.getElementById("telNumber");
  bar.innerHTML = "122"

  var ic1 = document.getElementById("ic1");
  var ic2 = document.getElementById("ic2");
  var ic3 = document.getElementById("ic3");
  ic1.src = "./img/wall-clock.png"
  ic2.src = "./img/buttons.png"
  ic3.src = "./img/maps-and-flagsb.png"
}

function showContacts(element) {
  var pad = document.getElementById("letterpad");
  pad.style.display = "none";

  var cbox = document.getElementById("contactbox");
  cbox.style.display = "flex";

  var cbox1 = document.createElement("div");
  cbox1.classList.add("cbox")
  cbox1.style.width = "70%"
  cbox1.style.height = "100%"
  var cbox2 = document.createElement("div");
  cbox2.style.width = "30%"
  cbox2.style.height = "100%"

  cbox.appendChild(cbox1)
  cbox.appendChild(cbox2)

  var letter = element.innerHTML;

  var letter_contacts = [];

  for (i = 0; i < contacts.length; i++) {
    if (contacts[i][1].substring(0, 1) == letter) {
      letter_contacts.push(contacts[i]);
    }
  }

  if (letter_contacts.length == 0) {
    var row = document.createElement("div");
    row.style = "width: 100%; height:15%; display: flex; justify-content: center; flex-direction: row; padding-top: 20px";

    var txt = document.createElement("div");
    txt.height = "50";
    txt.innerHTML = "No Contacts to show...";

    cbox1.appendChild(row);
    row.appendChild(txt);

    var div4 = document.createElement("div");
    div4.style = "width: 100%; height:15%; display: flex; justify-content: flex-end; align-items: center;";
    div4.onclick = showPad;

    var symbol2 = document.createElement("img");
    symbol2.src = "./img/arrows.png";
    symbol2.width = "50";
    symbol2.height = "50";
    symbol2.style.paddingRight = "20px"

    cbox2.appendChild(div4);
    div4.appendChild(symbol2);
  }

  for (i = 0; i < letter_contacts.length; i++) {
    var row = document.createElement("div");
    row.style = "width: 100%; height:15%; display: flex; justify-content: space-evenly; flex-direction: row; padding-top: 20px";

    var div1 = document.createElement("div");
    div1.style = "width: 30%;";

    var div2 = document.createElement("div");
    div2.style = "width: 35%; display: flex; align-items: center;";

    var div3 = document.createElement("div");
    div3.style = "width: 30%; display: flex; align-items: center;";

    var image = document.createElement("img");
    image.width = "70";
    image.height = "70";
    image.src = letter_contacts[i][0];

    var nome = document.createElement("div");
    nome.height = "20";
    nome.innerHTML = letter_contacts[i][1];

    var symbol = document.createElement("img");
    symbol.src = "./img/call.png";
    symbol.width = "40";
    symbol.height = "40";

    cbox1.appendChild(row);
    row.appendChild(div1);
    row.appendChild(div2);
    row.appendChild(div3);
    div1.appendChild(image);
    div2.appendChild(nome);
    div3.appendChild(symbol);

    if (i == 0) {
      var div4 = document.createElement("div");
      div4.style = "width: 100%; height:15%; display: flex; justify-content: flex-end; align-items: center;";
      div4.onclick = showPad;

      var symbol2 = document.createElement("img");
      symbol2.src = "./img/arrows.png";
      symbol2.width = "50";
      symbol2.height = "50";
      symbol2.style.paddingRight = "20px"

      cbox2.appendChild(div4);
      div4.appendChild(symbol2);
    }
  }
}

function showPad() {
  var pad = document.getElementById("letterpad");
  pad.style.display = "flex";

  var cbox = document.getElementById("contactbox");
  cbox.style.display = "none";

  cbox.innerHTML = "";
}


$(document).ready(function () {

  $('.num').click(function () {
      var num = $(this);
      var text = $.trim(num.find('.txt').clone().children().remove().end().text());
      var telNumber = $('#telNumber');
      if(text=="<"){
        $(telNumber).html(telNumber.html().slice(0, -1))
      }else{
        $(telNumber).html(telNumber.html() + text);
      }
  });

});