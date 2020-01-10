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
    let addPokemonButtons = document.querySelectorAll(".add-pokemon-button")
    for (const key in addPokemonButtons){
      addPokemonButtons[key].addEventListener("click", event => {this.addPokemonRequest(event)})
  }}

  addPokemonRequest(event){
    let payload = {
      trainer_id: 21
    }

    let configurationObject = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    async function new_pokemon() {
      try{
        debugger
      let res = await fetch(window.pageManager.trainers_url + `/new_pokemon`, configurationObject)
      window.pageManager.checkRes(res)
      let json = await res.json()
      let data = json.data
      
      }catch(error){
        alert(error)
      }
    }

    new_pokemon()

  
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
      <button class="add-pokemon-button" data-trainer-id="${trainer.id}">Add Pokemon</button>
      <ul class="trainer-pokemon-list">
      </ul>
      `)

      let cardElementList = cardElement.querySelector(".trainer-pokemon-list")

      for (const pokemon_key in trainer.attributes.pokemons){
        let pokemonObject = trainer.attributes.pokemons[pokemon_key]
        let cardElementListLi = document.createElement('li')
        cardElementListLi.innerHTML = (`
        ${pokemonObject.nickname} (${pokemonObject.species}) <button class="release" data-pokemon-id="${pokemonObject.id}">Release</button>
        `)
        cardElementList.appendChild(cardElementListLi)
      }

      this.container.appendChild(cardElement)
    }
  }


}


window.onload = () => {
  window.pageManager = new PageManager
}




