const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMON_URL = `${BASE_URL}/pokemon`;

const dom = {
  addBtn: document.querySelector('.add-btn'),
  removeBtn: document.querySelector('.release'),
  pokemonList: document.querySelector('.pokemon-list'),
  cardsContainer: document.querySelector('main')
}

function getTeams() {
  fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => renderTeams(json))
    .catch(error => alert(error.message));
}

function renderTeams(json) {
  const data = json["data"];

  for (const team of data) {
    const team_card = buildCard(team);
    renderTeamCard(team_card);
  }
}

function buildCard(team) {
  const teamAttributes = team.attributes;
  const currentPokemon = team.attributes.pokemon;

  const cardDiv = document.createElement('div');
  cardDiv.setAttribute("data-id", `${team.id}`);
  cardDiv.setAttribute("class", "card");

  const cardTrainerName = createCardTrainerName(teamAttributes);
  const cardPokemonAddButton = createCardPokemonAddButton(team);
  const cardPokemonList = document.createElement("ul");
  cardPokemonList.setAttribute("class", "pokemon-list");
  const listItems = createListItem(currentPokemon);

  // build list
  for (const item of listItems) {
    cardPokemonList.appendChild(item);
  }

  // build card
  cardDiv.appendChild(cardTrainerName);
  cardDiv.appendChild(cardPokemonAddButton);
  cardDiv.appendChild(cardPokemonList);

  return cardDiv;
}

function createCardTrainerName(teamAttributes) {
  const trainerNameElement = document.createElement('p');
  const trainerName = teamAttributes.name;
  const trainerNameText = document.createTextNode(`${trainerName}`);
  trainerNameElement.appendChild(trainerNameText);

  return trainerNameElement;
}

function createCardPokemonAddButton(team) {
  const pokemonAddButton = document.createElement('button');
  pokemonAddButton.setAttribute("data-trainer-id", `${team.id}`);
  pokemonAddButton.setAttribute("class", "add-btn");
  const pokemonAddButtonText = document.createTextNode("Add Pokemon");
  pokemonAddButton.appendChild(pokemonAddButtonText);

  return pokemonAddButton;
}

function createListItem(currentPokemon) {
  const items = [];

  for (const pokemon of currentPokemon) {
    const pokemonListItem = createPokemonListItem(pokemon);
    const releaseButton = createReleaseButton(pokemon);

    pokemonListItem.appendChild(releaseButton);
    items.push(pokemonListItem);
  }

  return items;
}

function createPokemonListItem(pokemon) {
  const pokemonListItem = document.createElement("li");
  const pokemonListItemText = document.createTextNode(`${pokemon.nickname} (${pokemon.species})`);
  pokemonListItem.appendChild(pokemonListItemText);

  return pokemonListItem;
}

function createReleaseButton(pokemon) {
  const releaseButton = document.createElement("button");
  const releaseButtonText = document.createTextNode("Release");
  releaseButton.setAttribute("class", "release");
  releaseButton.setAttribute("data-pokemon-id", `${pokemon.id}`);
  releaseButton.appendChild(releaseButtonText);

  return releaseButton;
}

function renderTeamCard(card) {
  const cardsContainer = document.querySelector('main');
  cardsContainer.appendChild(card);
}

function addPokemon(element) {
  const list = getList(element);
  const pokemonName = 
}

function isSpaceForMore(element) {
  const list = getList(element);

  return list.childElementCount < 6 ? true : false;
}

function getList(element) {
  const card = element.parentNode;
  const list = card.querySelector('ul');

  return list;
}

document.addEventListener("DOMContentLoaded", function(e) {
  getTeams();

  dom.cardsContainer.addEventListener('click', function(e) {
    if (e.target.className == "add-btn") {
      if (isSpaceForMore(e.target)) {
        addPokemon();
      } else {
        // do something
      }
    }
  });

});





// id: "1"
// type: "trainer"
// attributes:
//   name: "Natalie"
// pokemon: Array(6)
// 0:
//   id: 1
// species: "Raichu"
// nickname: "Xuan"
// trainer_id: 1
// __proto__: Object
