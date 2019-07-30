window.onload = function() {
  progresaBilde(0);
  document.getElementById("jauna-spele").onclick = jaunaSpele;
}

var progresaBildes = [
  "https://upload.wikimedia.org/wikipedia/commons/8/8b/Hangman-0.png",
  "https://upload.wikimedia.org/wikipedia/commons/3/30/Hangman-1.png",
  "https://upload.wikimedia.org/wikipedia/commons/7/70/Hangman-2.png",
  "https://upload.wikimedia.org/wikipedia/commons/9/97/Hangman-3.png",
  "https://upload.wikimedia.org/wikipedia/commons/2/27/Hangman-4.png",
  "https://upload.wikimedia.org/wikipedia/commons/6/6b/Hangman-5.png",
  "https://upload.wikimedia.org/wikipedia/commons/d/d6/Hangman-6.png"
];

var uzdevums, minejumi, progress;
var spele = false;

function jaunaSpele() {
  // Iztīrīt burtu pogas
	var divBurti = document.getElementById("burti");
	divBurti.innerHTML = "";
  // Jaunas burtu pogas
  var burti = "AĀBCČDEĒFGĢHIĪJKĶLĻMNŅOPRSŠTUŪVZŽ";
  for (var burtaId = 0; burtaId < burti.length; burtaId++) {
    var burts = burti[burtaId];
    var burtaPoga = document.createElement("button");
    burtaPoga.setAttribute("class", "burts");
    burtaPoga.innerHTML = burts;
    burtaPoga.onclick = function(e) {
      if (!spele) return;
      var burtaPoga = e.target;
      var burts = burtaPoga.innerHTML;
      if (minejumi.indexOf(burts) >= 0) return;
      var pareizi = minejums(burts);
      if (pareizi) {
        burtaPoga.setAttribute("class", " burts pareizi");
        var uzminets = atjaunotRebusu();
        if (uzminets) uzvara();
      } else {
        burtaPoga.setAttribute("class", "burts nepareizi");
        progress++;
        progresaBilde(progress);
        if (progress == 6) sagrave();
      }
    }
    divBurti.appendChild(burtaPoga);
  }
  // Jauns uzdevums
  uzdevums = jaunsUzdevums();
  minejumi = "";
  progress = 0;
  progresaBilde(progress);
  atjaunotRebusu();
  var divUzdevums = document.getElementById("uzdevums");
  divUzdevums.setAttribute("class", "neitrals");
  divUzdevums.style.display = "block";
  spele = true;
}

function jaunsUzdevums() {
  // Sagatavot jaunu uzdevumu
  return varduSaraksts[Math.floor(Math.random() * varduSaraksts.length)];
}

function minejums(burts) {
  if (minejumi.indexOf(burts) < 0) minejumi += burts;
  return (uzdevums.indexOf(burts) >= 0);
}

function atjaunotRebusu() {
  var rebuss = "";
  var uzminets = true;
  for (var burtaId = 0; burtaId < uzdevums.length; burtaId++) {
    var burts = uzdevums.charAt(burtaId);
    if (minejumi.indexOf(burts) >= 0) {
      rebuss += burts;
    } else {
      rebuss += "_";
      uzminets = false;
    }
  }
  document.getElementById("uzdevums").innerHTML = rebuss;
  return uzminets;
}

function uzvara() {
  var divUzdevums = document.getElementById("uzdevums");
  divUzdevums.innerHTML = uzdevums;
  divUzdevums.setAttribute("class", "pareizi");
  spele = false;
}

function sagrave() {
  var divUzdevums = document.getElementById("uzdevums");
  divUzdevums.innerHTML = uzdevums;
  divUzdevums.setAttribute("class", "nepareizi");
  spele = false;
}

function progresaBilde(progress) {
  if (progress >= 0 && progress < progresaBildes.length) {
  	var imgProgresaBilde = document.getElementById("progresa-bilde");
  	imgProgresaBilde.setAttribute("src", progresaBildes[progress]);
  }
}