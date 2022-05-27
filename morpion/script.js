let tourRond;
const CLASSE_O = "circle";
const CLASSE_X = "x";
const board = document.querySelector("#board");
const COMBINAISONS_GAGNANTES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const messageGagnant = document.querySelector("[data-winning-message-text]");
const messageElmt = document.querySelector("#winningMessage");
const button = document.querySelector("button");
const caseTableaux = document.querySelectorAll("[data-cell]"); //récupérer par l'attribut
console.log(caseTableaux);

startGame();

function startGame() {
  tourRond = false;
  caseTableaux.forEach((dalle) => {
    dalle.classList.remove(CLASSE_X);
    dalle.classList.remove(CLASSE_O);
    dalle.removeEventListener("click", handleClick);
    dalle.addEventListener("click", handleClick, { once: true });
  });
  survol();
  messageElmt.classList.remove("show");
}

function handleClick(e) {
  //placer une marque
  const cell = e.target;
  let classActuelle = tourRond ? CLASSE_O : CLASSE_X;
  placerMark(cell, classActuelle);
  //vérifier si victoire
  if (checkWin(classActuelle)) {
    finDuJeu(false);
  } else if (egalite()) {
    finDuJeu(true);
  }
  //vérifier si égalité

  //changer de tour
  changerTour();
  survol();
}
button.addEventListener("click", startGame);
function finDuJeu(egalite) {
  if (egalite) {
    messageGagnant.textContent = "égalité";
  } else {
    messageGagnant.textContent = tourRond ? "O gagne" : "X gagne";
  }
  messageElmt.classList.add("show");
}

function placerMark(cell, classActuelle) {
  cell.classList.add(classActuelle);
}
function changerTour() {
  tourRond = !tourRond;
}
function survol() {
  board.classList.remove(CLASSE_X);
  board.classList.remove(CLASSE_O);
  if (tourRond) {
    board.classList.add(CLASSE_O);
  } else {
    board.classList.add(CLASSE_X);
  }
}

function checkWin(classActuelle) {
  return COMBINAISONS_GAGNANTES.some((combinaison) => {
    return combinaison.every((valeur) => {
      return caseTableaux[valeur].classList.contains(classActuelle);
    });
  });
}

function egalite() {
  return [...caseTableaux].every((emplacement) => {
    return (
      emplacement.classList.contains(CLASSE_X) ||
      emplacement.classList.contains(CLASSE_O)
    );
  });
}
