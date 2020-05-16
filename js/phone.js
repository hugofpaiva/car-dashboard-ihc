var recentcalls = [["./img/pedro.jpeg", "Pedro<br>today"], ["./img/fabiana.jpeg", "Fabiana<br>yesterday"], ["./img/alberto.jpeg", "Alberto<br>yesterday"], ["./img/alfredo.jpeg", "Alfredo<br>yesterday"]];

for(i=0; i<4;i++){
    document.getElementById("desc"+i).innerHTML = recentcalls[i][1]
    document.getElementById("im"+i).src = recentcalls[i][0]
}