const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("main")

function addTrainerToCard(trainer) {
    let div = document.createElement('div')
    div.className = "card"
    div.dataset.id = trainer.id
    let p = document.createElement("p")
    p.innerHTML = trainer.name
    let btn = document.createElement("button")
    btn.dataset.trainerId = trainer.id
    btn.innerHTML = "Add Pokemon"
    let ul = document.createElement("ul")
    div.appendChild(p)
    div.appendChild(btn)
    div.appendChild(ul)
    main.appendChild(div)
}

function releasePokemon(pokemonId) {
    fetch(`${POKEMONS_URL}/${pokemonId}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(console.log)
}

main.addEventListener("click", e => {
    if (e.target.className === "release" ) {
      releasePokemon(e.target.dataset.pokemonId)
      e.target.parentElement.remove()
    }
    if (e.target.dataset.trainerId) &&  {
      let trainerId = parseInt(e.target.dataset.trainerId)
      fetchNewPokemon(trainerId)
    } 
})

function addPokemonToCard(pokemon) {
    let ul = document.querySelector(`[data-id="${pokemon.trainer_id}"] ul`)
    let li = document.createElement("li")
    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
    let btn = document.createElement("button")
    btn.className = "release"
    btn.dataset.pokemonId = pokemon.id
    li.appendChild(btn)
    ul.appendChild(li)
}

function fetchPokemons() {
    fetch(POKEMONS_URL)
    .then(resp => resp.json())
    .then(pokemons => {
        pokemons.forEach(pokemon => {
            addPokemonToCard(pokemon)
        })
    })
}

function fetchNewPokemon(trainerId) {
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            trainer_id: trainerId
        })
    })
    .then(resp => resp.json())
    .then(pokemon => addPokemonToCard(pokemon))
}

function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => {
        trainers.forEach(trainer => {
            addTrainerToCard(trainer)
        })
    })
}

document.addEventListener('DOMContentLoaded', function() {
    fetchTrainers()
    fetchPokemons()
})
