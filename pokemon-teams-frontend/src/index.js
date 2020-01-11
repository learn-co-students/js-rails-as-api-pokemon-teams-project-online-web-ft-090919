const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("main")
const li = document.createElement("li")


//loads trainers to screen && pokemon 
document.addEventListener("DOMContentLoaded", () => {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => {
        const trainersArray = trainers["data"]
        trainersArray.forEach(trainer => 
            main.innerHTML += `
                <div class="card" data-id="${trainer['id']}"><p>${trainer['attributes']["name"]}</p>
                    <button data-trainer-id="${trainer['id']}" class="addPokemon">Add Pokemon</button>
                    <ul> 
                    </ul>
                </div>
            `
        )
        trainersArray.forEach(trainer =>
                trainer['attributes']['pokemon'].forEach(pokemon =>{
                    const ul = document.querySelector(`[data-id="${trainer['id']}"]`).children[2]                                
                    ul.innerHTML += `<li>${pokemon['nickname']} (${pokemon['species']}) <button class="release" data-pokemon-id="${pokemon['id']}">Release</button></li>`;
                })
            )
    })
})

// fetches new pokmon
function addPokemon(trainerId){
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
    .then(pokemonRaw => {
        const pokemon = pokemonRaw["data"]
        const ul = document.querySelector(`[data-trainer-id="${trainerId}"]`).parentNode.children[2]
        ul.innerHTML += `<li>${pokemon['attributes']['nickname']} (${pokemon['attributes']['species']}) <button class="release" data-pokemon-id="${pokemon['id']}">Release</button></li>`
    })
}

// deletes(releases) Pokemon
function releasePokemon(pokemonId){
    fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    })
}

// sets listenr to all buttons
document.addEventListener("click", ({target}) => {
    console.log(target.dataset['trainerId'])
    switch(target.className){
        case "release":
            // onclick activates releasePokemon &&
            // removes pokemon form list
            releasePokemon(target.dataset.pokemonId)
            target.parentElement.remove();
            break;
        case "addPokemon":
            if (target.parentNode.children[2].childElementCount < 6){
                // onclick activates addPokemon &&
                // appends it to list if trainer has <= 6 pokemon
                //target.parentNode.children[2].innerHTML +=
                addPokemon(target.dataset['trainerId']);
                break;
            } else {
                alert("you can only have up to 6 pokemon!");
                break;
            }
            
    }
})

