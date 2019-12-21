const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function addTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => {
        trainers.forEach(trainer => fetchTrainer(trainer))
    })
}

function fetchTrainer(trainer) {
    return fetch(`${TRAINERS_URL}/${trainer.id}`)
    .then(resp => resp.json())
    .then(trainer => {
        createTrainerCard(trainer)
        return trainer
    })
}

function createTrainerCard(trainer) {
    const main = document.querySelector("main")
    let firstPart = `
        <div class="card" data-id="${trainer.id}">
            <p>${trainer.name}</p>
            <button data-trainer-id="${trainer.id}">Add Pokemon</button>
            <ul>
    `
    trainer.pokemons.forEach(pokemon => {
        firstPart += `
            <li>
                ${pokemon.nickname} (${pokemon.species})
                <button class="release" data-pokemon-id="${pokemon.id}">
                    Release
                </button>
            </li>
        `
    })
    main.innerHTML += firstPart + `</ul></div>`

}





