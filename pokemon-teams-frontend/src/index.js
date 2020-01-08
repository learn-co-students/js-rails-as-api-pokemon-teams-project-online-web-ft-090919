const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function addTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => {
        trainers.forEach(trainer => fetchTrainer(trainer))
    })
    .then(addReleaseBtns)

}

const fetchTrainer = (trainer) => {
    return fetch(`${TRAINERS_URL}/${trainer.id}`)
    .then(resp => resp.json())
    .then(trainer => {
        createTrainerCard(trainer)
    })
}

const createTrainerCard = (trainer) => {
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

const addReleaseBtns = () => {
    setTimeout(() => {
        const releaseBtns = document.querySelectorAll(".release")
        releaseBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                fetch(`${POKEMONS_URL}/${btn.dataset.pokemonId}`, {
                    method: "DELETE"
                })
                document.location.reload()
            })
        })
    }, 500)
}

const test =  () => {
    let addBtn = document.querySelector(`[data-trainer-id="1"]`)
    addBtn.addEventListener("click", () => {
        console.log("button clicked")
        debugger
        fetch(`${POKEMONS_URL}`), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: 1
            })
        }
    })
}

addTrainers()
setTimeout(test, 500)




