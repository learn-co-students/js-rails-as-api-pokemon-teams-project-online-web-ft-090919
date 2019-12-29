const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
// const POKEMONS_URL = `${BASE_URL}/pokemons`
const POKEMON_URL = `${BASE_URL}/pokemon`;


function getTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => renderTeams(json))
    // .then(json => console.log(json))
    .catch(error => alert(error.message))
   }


//   render Team data, use that data to build card,
//   user that card data to render team card
function renderTeams(json) {
   const trainerData = json["data"];

   for (const team of trainerData) {
       const teamCardInfo = buildTeamCard(team)
       renderTeamCard(teamCardInfo)
     }
    }  
    

function buildTeamCard(team) {
    const teamAttributes = team.attributes;
    const currentPokemon = team.attributes.pokemons; 

    const cardDiv = document.createElement('div');
    cardDiv.setAttribute("data-id", `${team.id}`);
    cardDiv.setAttribute("class", "card");
  
    // use custom functions to create trainer name and add button
    const cardTrainerName = createCardTrainerName(teamAttributes);
    const cardPokemonAddButton = createCardPokemonAddButton(team);
    const cardPokemonList = document.createElement("ul");
    cardPokemonList.setAttribute("class", "pokemon-list");
    const listItems = createListItems(currentPokemon);
  
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
  const nameElement = document.createElement('p');
  const trainerName = teamAttributes.name;
  const nameText = document.createTextNode(`${trainerName}`);
  nameElement.appendChild(nameText);
  // Could also maybe add innerHTML text here instead of append child

  return nameElement
}


function createCardPokemonAddButton(team) {
  const addButton = document.createElement('button')
  addButton.setAttribute('data-trainer-id', `${team.id}`)
  addButton.setAttribute('class', 'add-btn')
  const buttonText = document.createTextNode(`Add Pokemon`)
  addButton.appendChild(buttonText)

  return addButton
}


function createListItems(currentPokemon) {
  const pokemons = []

  for (const pokemon of currentPokemon) {
    const pokemonListItem = createPokemonListItem(pokemon)
    const releaseButton = createReleaseButton(pokemon)

    pokemonListItem.appendChild(releaseButton)
    pokemons.push(pokemonListItem)
  }
  return pokemons
}


function createPokemonListItem(pokemon){
  const addList = document.createElement("li")
  const listText = document.createTextNode(`${pokemon.nickname} (${pokemon.species})`)

  addList.appendChild(listText)
  return addList 
}


function createReleaseButton(pokemon) {
  const releaseButton = document.createElement('button')
  releaseButton.setAttribute('data-pokemon-id', `${pokemon.id}`)
  releaseButton.setAttribute('class', 'release')
  const releaseButtonText = document.createTextNode('Release')
  releaseButton.appendChild(releaseButtonText)

  return releaseButton 
}


function renderTeamCard(teamCardInfo) {
  const teamInfoContainer = document.querySelector('main')
  teamInfoContainer.appendChild(teamCardInfo)
}


function spaceAvailable(element) {
  const list = getList(element)
  return list.childElementCount < 6 ? true : false 
}


function getList(element) {
  const card = element.parentNode
  const list = card.querySelector("ul")

  return list 
}


function addPokemon(element) {
  const trainerID = parseInt(element.getAttribute('data-trainer-id'), 10)

  const configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ id: trainerID })
  }
  fetch(POKEMON_URL, configObj)
  .then(resp => resp.json())
  .then(json => renderNewPokemon(json, element))
  .catch(error => alert(error.message))
}


function renderNewPokemon(json, element) {
  const formattedPokemon = formatPokemonData(json)
  const pokemonListItem = createPokemonListItem(formattedPokemon)
  const releaseButton = createReleaseButton(formattedPokemon)
  pokemonListItem.appendChild(releaseButton)
  element.nextSibling.appendChild(pokemonListItem)
}


function formatPokemonData(json) {

  const data = json["data"]
  const newPokemon = {
    id: data["id"],
    species: data["attributes"]["species"],
    nickname: data["attributes"]["nickname"],
    trainer_id: data["relationships"]["trainer"]["data"]["id"]
  }

  return newPokemon
}


function removePokemon(element) {
  const pokemonID = parseInt(element.getAttribute('data-pokemon-id'), 10)
  destroyPokemon(pokemonID)
}


function destroyPokemon(pokemonID) {
  fetch(`${POKEMON_URL}/${pokemonID}`, { method: "DELETE", })
  .then(removePokemonFromDOM(pokemonID))
  .catch(error => alert(error.message))
}


function removePokemonFromDOM(pokemonID) {
  const pokemonItem = document.querySelector(`[data-pokemon-id="${pokemonID}"]`)
  pokemonItem.parentNode.remove()
}


// function clickEventListener() {
//   document.querySelector('main').addEventListener('click', function(event) {
//     if (event.target.className == "add-btn") {
//       if (spaceAvailable(event.target)) {
//         addPokemon(event.target)
//       }
//     } else if (event.target.className == 'release') {
//       removePokemon(event.target)
//   }
// })


document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded")
    getTrainers()

    // clickEventListener()

      document.querySelector('main').addEventListener('click', function(event) {
        if (event.target.className == "add-btn") {
          if (spaceAvailable(event.target)) {
            addPokemon(event.target)
          }
        } else if (event.target.className == 'release') {
          removePokemon(event.target)
        }
      })
    })