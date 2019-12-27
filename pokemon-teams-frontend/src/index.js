const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMON_URL = `${BASE_URL}/pokemon`;

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

function isSpaceForMore(element) {
  const list = getList(element);

  return list.childElementCount < 6 ? true : false;
}

function getList(element) {
  const card = element.parentNode;
  const list = card.querySelector('ul');

  return list;
}

function addPokemon(element) {
  const trainerID = parseInt(element.getAttribute("data-trainer-id"), 10);

  const configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ id: trainerID })
  };

  fetch(POKEMON_URL, configObject)
    .then(response => response.json())
    .then(json => renderNewPokemon(json, element))
    .catch(error => alert(error.message));
}

function renderNewPokemon(json, element) {
  const formattedPokemon = formatData(json);
  const pokemonListItem = createPokemonListItem(formattedPokemon);
  const releaseButton = createReleaseButton(formattedPokemon);

  pokemonListItem.appendChild(releaseButton);
  element.nextSibling.appendChild(pokemonListItem);
}

function formatData(json) {
  const data = json["data"];
  const newPokemon = {
    id: data["id"],
    species: data["attributes"]["species"],
    nickname: data["attributes"]["nickname"],
    trainer_id: data["relationships"]["trainer"]["data"]["id"]
  };

  return newPokemon;
}

function removePokemon(element) {
  const pokemonID = parseInt(element.getAttribute("data-pokemon-id"), 10);
  destroyPokemon(pokemonID);
}

function destroyPokemon(id) {
  fetch(`${POKEMON_URL}/${id}`, { method: "DELETE", })
    .then(removePokemonFromDom(id))
    .catch(error => alert(error.message));
}

function removePokemonFromDom(id) {
  const pokemonItem = document.querySelector(`[data-pokemon-id="${id}"]`);
  pokemonItem.parentNode.remove();
}

document.addEventListener("DOMContentLoaded", function(e) {
  getTeams();

  document.querySelector('main').addEventListener('click', function(e) {
    if (e.target.className == "add-btn") {
      if (isSpaceForMore(e.target)) {
        addPokemon(e.target);
      }
    } else if (e.target.className == "release") {
      removePokemon(e.target);
    }
  });
});
