const info = document.querySelector(".info");
const cellules = document.querySelectorAll(".cell");
const main = document.querySelector("main");
const btnRejouer = document.querySelector(".btn-rejouer");

let verrouillage = true,
    joueurEnCours = "X";

info.innerHTML = `Au tour de ${joueurEnCours}`;

const alignementsGagnants = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
];

let partieEnCours = ["", "", "", "", "", "", "", "", ""];

cellules.forEach(cell => {
    cell.addEventListener("click", clicSurCase);
});

function clicSurCase(e) {
    const caseClique = e.target;
    const caseIndex = caseClique.getAttribute("data-index");

    if (partieEnCours[caseIndex] !== "" || !verrouillage) {
        return;
    }

    partieEnCours[caseIndex] = joueurEnCours;
    caseClique.innerHTML = joueurEnCours;
    console.log(partieEnCours);

    validationResultats();
}

function validationResultats() {
    let finDePartie = false;

    for (let i = 0; i < alignementsGagnants.length; i++) {
        const alignementGagnant = alignementsGagnants[i];
        let a = partieEnCours[alignementGagnant[0]];
        let b = partieEnCours[alignementGagnant[1]];
        let c = partieEnCours[alignementGagnant[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            finDePartie = true;
            break;
        }
    }

    if (finDePartie) {
        main.style.minHeight = "610px";
        info.innerText = `Le joueur ${joueurEnCours} a gagné 🎉`;
        info.style.color = "springgreen";
        verrouillage = false;
        btnRejouer.style.display = "block";
        return;
    }

    let matchNul = !partieEnCours.includes("");
    if (matchNul) {
        main.style.minHeight = "560px";
        info.innerText = `🏳️ Match nul 🏳️`;
        info.style.color = "yellow";
        btnRejouer.style.display = "block";
        return;
    }

    changementDeJoueur();
}

function changementDeJoueur() {
    joueurEnCours = joueurEnCours === "X" ? "O" : "X";
    info.innerText = `Au tour de ${joueurEnCours}`;
}

btnRejouer.addEventListener("click", () => {
    location.reload();
});
