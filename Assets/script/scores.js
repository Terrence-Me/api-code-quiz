function printHighscore() {
  let highscore = JSON.parse(window.localStorage.getItem("highscores")) || [];

  highscore.sort(function (a, b) {
    return b.score - a.score;
  });

  highscore.forEach(function (score) {
    let liScore = document.createElement("li");
    liScore.textContent = score.initials + " - " + score.score;
    console.log(liScore);
    let olLi = document.getElementById("scores-page");
    olLi.appendChild(liScore);
  });
}

printHighscore();
