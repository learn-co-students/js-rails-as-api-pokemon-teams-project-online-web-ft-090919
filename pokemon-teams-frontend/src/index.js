const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//DOM elements
let main = document.querySelector("main");

//page load
document.addEventListener('DOMContentLoaded', function(){
    setupPage();
})

function setupPage(){
    fetchTrainers();
    fetchPokemon();
    setupBtns();
}

function fetchTrainers(){
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => {
        trainers.forEach(trainer => {
            addTrainerToCard(trainer)
        })
    })
}

function fetchPokemon(){
    fetch(POKEMONS_URL)
    .then(response => response.json())
    .then(pokemons => {
        pokemons.forEach(pokemon => {
            addPokemonToCard(pokemon)
        })  
    })
}

function setupBtns(){
    main.addEventListener("click", e => {
        if(e.target.className === "releasePokemon"){
            releasePokemon(e.target.id)
            e.target.parentElement.remove();
        }else if(e.target.className === "addPokemon"){
            let trainerId = e.target.id
            fetchNewPokemon(trainerId)
        }
    })
}

function addTrainerToCard(trainer){
    let div = document.createElement('div');
    div.className = "card";
    div.id = trainer.id;
    
    let p = document.createElement('p');
    p.innerHTML = trainer.name;

    let btn = document.createElement('button');
    btn.className = "addPokemon"
    btn.id = trainer.id;
    btn.innerHTML = "Add Pokemon";
    
    let ul = document.createElement('ul');
    ul.id = `ul ${trainer.id}`; 

    div.appendChild(p);
    div.appendChild(btn);
    div.appendChild(ul);
    main.appendChild(div)
}

function addPokemonToCard(pokemon){
    let ul = document.getElementById(`ul ${pokemon.trainer_id}`);

    let li = document.createElement('li');
    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`;

    let btn = document.createElement('button');
    btn.className = "releasePokemon";
    btn.id = pokemon.id;
    btn.innerHTML = "release";

    li.appendChild(btn);
    ul.appendChild(li);
}

function fetchNewPokemon(trainerId){
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
    .then(response => response.json())
    .then(pokemon => addPokemonToCard(pokemon))
}

function releasePokemon(id){
    fetch(`${POKEMONS_URL}/${id}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then(console.log)
}