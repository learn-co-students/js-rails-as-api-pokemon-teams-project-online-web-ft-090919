class PageManager {

  constructor(){
    this.base_url = "http://localhost:3000"
    this.pokemons_url = `${this.base_url}/pokemons`
    this.trainers_url = `${this.base_url}/trainers`
    this.container = document.querySelector("main")
    this.fetchAndLoadData()
  }

  async fetchAndLoadData() {
    try{
      const res = await fetch(this.base_url)
      this.checkRes(res)
      const json = await res.json()
      this.data = json.data
      this.render
      this.initBindingsAndEventListeners
      
    }catch(error){
      alert(error)
    }
  }

  get initBindingsAndEventListeners(){

      this.container.addEventListener("click", function checkElementClicked(event){
        if(event.target.className == "release"){
          window.pageManager.releasePokemonRequest(event)
        } else if(event.target.className == "add-pokemon-button") {
          window.pageManager.addPokemonRequest(event)
        }
      })

      // let releasePokemonButtons = document.querySelectorAll(".release")
      // for (const key in releasePokemonButtons){
      //   releasePokemonButtons[key].addEventListener("click", event => {this.releasePokemonRequest(event)})
      // }

      // let addPokemonButtons = document.querySelectorAll(".add-pokemon-button")
      // for (const key in addPokemonButtons){
      //   addPokemonButtons[key].addEventListener("click", event => {this.addPokemonRequest(event)})
      // }

     
  }

  releasePokemonRequest(event){
    let configurationObject = {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pokemon_id: event.target.dataset.pokemonid
      })
    }
    async function releasePokemon() {
      try{
      let res = await fetch(window.pageManager.pokemons_url + `/release_pokemon`, configurationObject)
      window.pageManager.checkRes(res)
      let json = await res.json()
      let trainerData = json.data
      window.pageManager.updatePokemonList(window.pageManager.container.querySelector(`div[data-id = "${trainerData.id}"] `), trainerData)

      }catch(error){
        alert(error.statusText)
      }
    }
    releasePokemon()

  }


  addPokemonRequest(event){
    let configurationObject = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trainer_id: event.target.dataset.trainerid
      })
    }

    async function newPokemon() {
      try{
      let res = await fetch(window.pageManager.trainers_url + `/new_pokemon`, configurationObject)
      window.pageManager.checkRes(res)
      let json = await res.json()
      let trainerData = json.data
      window.pageManager.updatePokemonList(window.pageManager.container.querySelector(`div[data-id = "${trainerData.id}"] `), trainerData)

      }catch(error){
        alert(error.statusText)
      }
    }
    newPokemon()
  }



  checkRes(res){
    if(!res.ok){
      throw res
    }
  }

  get render() {
    for (const trainer of this.data) {
      let cardElement = document.createElement('div')
      cardElement.setAttribute("data-id", trainer.id)
      cardElement.className = "card"

      cardElement.innerHTML = (`
      <p>${trainer.attributes.name}</p>
      <button class="add-pokemon-button" data-trainerid="${trainer.id}">Add Pokemon</button>
      <ul class="trainer-pokemon-list">
      </ul>
      `)

      this.updatePokemonList(cardElement, trainer)

      this.container.appendChild(cardElement)
    }
  }

  updatePokemonList(cardElement, trainer){
    let cardElementList = cardElement.querySelector(".trainer-pokemon-list")
    cardElementList.innerHTML = ''
    for (const pokemon_key in trainer.attributes.pokemons){
      let pokemonObject = trainer.attributes.pokemons[pokemon_key]
      let cardElementListLi = document.createElement('li')
      cardElementListLi.innerHTML = (`
      ${pokemonObject.nickname} (${pokemonObject.species}) <button class="release" data-pokemonid="${pokemonObject.id}">Release</button>
      `)
      cardElementList.appendChild(cardElementListLi)
    }

  }


}

window.onload = () => {
  window.pageManager = new PageManager
}




