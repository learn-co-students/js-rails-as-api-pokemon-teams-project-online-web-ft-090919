const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// main is section where trainer cards will go
const main = document.querySelector('main')

// work to do for button clicks
main.addEventListener('click', e => {
    // release pokemon button
    if (e.target.className === 'release') {
        // call on function to delete pokemon resource
        deletePokemon(e.target.dataset.pokemonId)
        // delete the list item as well
        e.target.parentElement.remove()
    }
    // add pokemon button
    if (e.target.dataset.trainerId) {
        // turn attribute into integer to pass to controller
        let trainerId = parseInt(e.target.dataset.trainerId)
        // create new pokemon
        fetchNewPokemon(trainerId)
    }
})

// function to create pokemon and add to card
function fetchNewPokemon(trainerId) {
    fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            trainer_id: trainerId
        })
    })
    .then(resp => resp.json())
    // take json response object and add it to card
    .then(pokemon => addPokemonToCard(pokemon))
}

// function to delete pokemon resource
function deletePokemon(pokemonId) {
    // fetch pokemon resource by id
    fetch(`${POKEMONS_URL}/${pokemonId}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then(resp => resp.json())
    // add deleted pokemon to log
    .then(console.log)
}

// function to add pokemon to card
function addPokemonToCard(pokemon) {
    // grab list element that matches pokemon trainer's id
    let ul = document.querySelector(`[data-id="${pokemon.trainer_id}"] ul`)

    // create li element
    let li = document.createElement('li')
    li.innerHTML = pokemon.species

    // create button to release pokemon
    let btn = document.createElement('button')
    btn.className = 'release'

    // assign pokemon id to button for submit purposes
    btn.dataset.pokemonId = pokemon.id

    // attach button to li and li to ul
    li.appendChild(btn)
    ul.appendChild(li)
}


// function to add trainer to card, accepts argument of a trainer and assigns attributes
function addTrainerToCard(trainer) {
    // create div for card
    let div = document.createElement('div')
    div.className = 'card'
    
    // assign name to header element of card
    let h1 = document.createElement('h1')

    // create list for pokemon to be added to
    let ul = document.createElement('ul')

    // create button to add new pokemon
    let btn = document.createElement('button')
    btn.innerHTML = "Add Pokemans"

    // attach attributes to elements
    div.dataset.id = trainer.id
    h1.innerHTML = trainer.name
    btn.dataset.trainerId = trainer.id

    // append elements to div
    div.appendChild(h1)
    div.appendChild(ul)
    div.appendChild(btn)

    // append card to main
    main.appendChild(div)
}

// function to fetch pokemon from resource (plural with s to avoid variable confusion)
function fetchPokemons() {
    fetch(POKEMONS_URL)
    .then(resp => resp.json())
    .then(pokemons => {
        pokemons.forEach(pokemon => {
            addPokemonToCard(pokemon)
        })
    })
}

// function to fetch trainers from resource
function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => {
        trainers.forEach(trainer =>{
            addTrainerToCard(trainer)
        })
    })
}


// Load trainers and pokemon after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    fetchTrainers()
    fetchPokemons()
})

/* sample card

<div class="card" data-id="1"><p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div>

*/