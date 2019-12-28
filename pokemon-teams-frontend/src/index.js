const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function sendReq(reqType, url, data, returnFunction){
  fetch(url, {
    method: reqType,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(resp => resp.json())
  .then(function(json){
    debugger
    if (!!json[0].match(/six/)){
      showErrors(json)
    }
    returnFunction[0](json)
  })
  .catch((errors) => {
    showErrors(errors)
  })
}

function fetchTrainers(){
  fetch(TRAINERS_URL).then(resp => resp.json()).then(json => loadTrainers(json))
}

function showErrors(errors){
  console.error('Request Error:', errors);

  let errorDiv = document.querySelector("#errors")

  let errorTxt = document.createElement('p')
  errorTxt.textContent = errors

  errorDiv.appendChild(errorTxt)

}

// append the new pokemen from response to specific trainers card
function appendPokemon(pokemon){
  // get the list inside of the correct trainers card
  let pokemonList = document.querySelector(`.card[data-id='${pokemon.trainer_id}']>ul`)
  pokemonList.appendChild(pokemonElement(pokemon))
}

function addPokemon(trainerId){
  sendReq('POST', POKEMONS_URL, {trainer_id: trainerId}, [appendPokemon])

}

function removePokemon(elem){

  sendReq('DELETE', `${POKEMONS_URL}/${elem.dataset.pokemonId}`, {}, [console.log])

  elem.parentNode.parentNode.removeChild(elem.parentNode)
}

const pokemonElement = function(pokemon){
  // console.warn(pokemon)
  let newLi = document.createElement('li')
  let releaseBtn = document.createElement('button')

  newLi.textContent = `${pokemon.nickname} (${pokemon.species})`

  releaseBtn.classList = 'release'
  releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
  releaseBtn.textContent = 'Release'
  releaseBtn.addEventListener('click', function(e){
    e.preventDefault()
    removePokemon(e.target)
  })

  newLi.appendChild(releaseBtn)
  return newLi
}


const trainerCard = function(trainer){
  let newCard = document.createElement('div')
  newCard.classList = "card"
  newCard.setAttribute('data-id', trainer.id)

  let cardTitle = document.createElement('p')
  cardTitle.textContent = trainer.name

  newCard.appendChild(cardTitle)

  let addBtn = document.createElement('button')
  addBtn.setAttribute('data-trainer-id', trainer.id)
  addBtn.textContent = 'Add Pokemon'
  addBtn.addEventListener('click', function(e){
    e.preventDefault()
    addPokemon(e.target.dataset.trainerId)
  })

  newCard.appendChild(addBtn)

  let newList = document.createElement('ul')

  trainer.pokemons.forEach(function(pokemon){
    let newLi = pokemonElement(pokemon)
    newList.appendChild(newLi)
  })
  newCard.appendChild(newList)
  return newCard
}

const pokemonListItems = function(pokemons){
  let newList = document.createElement('ul')

  pokemons.forEach(function(pokemon){
    let listItem = pokemonElement(pokemon)
    newList.appendChild(listItem)
  })
  return newList.innerHTML
}


function addTrainerCard(trainer){
  // console.log(newCard(trainer))

  let container = document.querySelector('main')
  container.appendChild(trainerCard(trainer))
  // container.innerHTML += newCard(trainer)
}

function loadTrainers(trainers){
  trainers.forEach(trainer => addTrainerCard(trainer))
}

// Wait for dom to fully load before adding our trainers and pokemon
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    fetchTrainers()
});
