const BASE_URL = 'http://localhost:3000'
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchTrainers () {
  return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => renderTrainerCards(json))
}

function renderTrainerCards (json) {
  const main = document.querySelector('main')
  json.forEach(trainer => {
    const div = document.createElement('div')
    div.setAttribute('data-id', `${trainer.id}`)

    const button = document.createElement('button')
    button.setAttribute('data-trainer-id', `${trainer.id}`)
    button.innerText = 'Add Pokemon'

    const ul = document.createElement('ul')
    button.addEventListener('click', function (e) {
      let trainerID = trainer.id

      async function asyncCall () {
        let result = await addPokemon(trainerID)
        let pokemonID = result.id
        const li = document.createElement('li')
        const button2 = document.createElement('button')

        button2.setAttribute('data-pokemon-id', `${result.species}`)
        button2.innerText = 'Release'
        button2.style.float = 'right'
        button2.style.backgroundColor = 'red'
        li.innerText += `${result.nickname} (${result.species})`
        li.appendChild(button2)
        ul.appendChild(li)

        button2.addEventListener('click', function (e) {
          removePokemon(result.id)
          this.parentNode.remove()
        })
      }

      asyncCall()
    })

    trainer.pokemons.forEach(function (poke) {
      const li = document.createElement('li')
      const button2 = document.createElement('button')
      button2.setAttribute('data-pokemon-id', `${poke.species}`)
      button2.innerText = 'Release'
      button2.style.float = 'right'
      button2.style.backgroundColor = 'red'
      li.innerText += `${poke.nickname} (${poke.species})`
      li.appendChild(button2)
      ul.appendChild(li)

      button2.addEventListener('click', function (e) {
        removePokemon(poke.id)
        this.parentNode.remove()
      })
    })

    div.className = 'card'
    div.innerHTML = `<p>${trainer.name}</p>`
    div.appendChild(button)
    div.appendChild(ul)
    main.appendChild(div)
  })
}

function addPokemon (trainerID) {
  let formData = {
    trainer_id: trainerID
  }
  let configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(formData)
  }

  return fetch('http://localhost:3000/pokemons', configObj)
    .then(function (response) {
      return response.json()
    })
    .then(function (object) {
      return object
    })
}

function removePokemon (pokemonID) {
  let configObj = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }

  return fetch(`http://localhost:3000/pokemons/${pokemonID}`, configObj)
    .then(function (response) {
      return response.json()
    })
    .then(function (object) {
      return object
    })
}

window.addEventListener('DOMContentLoaded', function (e) {
  fetchTrainers()
})
