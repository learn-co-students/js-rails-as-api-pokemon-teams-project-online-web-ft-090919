const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

document.addEventListener("DOMContentLoaded", function() {
  getTrainers();
});

function getTrainers() {
  fetch(`${BASE_URL}/trainers`)
    .then(response => {
      return response.json();
    })
    .then(json => {
      json.forEach(trainer => displayTrainer(trainer));
    });
}

function displayTrainer(trainer) {
  var node = document.createElement("DIV");
  var addButton = document.createElement("BUTTON");
  var ul = document.createElement("UL");
  node.classList.add("card");
  node.setAttribute("data-id", `${trainer.id}`);
  addButton.setAttribute("data-trainer-id", `${trainer.id}`);
  document.querySelector("main").appendChild(node);
  node.appendChild(addButton);
  node.appendChild(ul);
  addButton.innerHTML = "Add Pokemon!";

  trainer.pokemons.forEach(pokemon => {
    var li = document.createElement("LI");
    var button = document.createElement("BUTTON");
    button.setAttribute("data-pokemon-id", `${pokemon.id}`);
    button.classList.add("release");
    button.innerHTML = "Release";
    li.innerText += `${pokemon.nickname} (${pokemon.species})`;
    li.appendChild(button);
    ul.appendChild(li);
  });
}
