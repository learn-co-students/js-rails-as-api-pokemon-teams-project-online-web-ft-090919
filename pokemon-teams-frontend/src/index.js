const BASE_URL = 'http://localhost:3000';
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

function fetchTrainers() {
  return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => renderTrainerCards(json));
}

function renderTrainerCards(json) {
  const main = document.querySelector('main');
  json.forEach(trainer => {
    // trainer div
    const div = document.createElement('div');
    div.setAttribute('data-id', `${trainer.id}`);
    // add pokemon button
    const button = document.createElement('button');
    
    button.setAttribute('data-trainer-id', `${trainer.id}`);
    button.innerText = 'Add Pokemon';
    // 
    // ul for pokemon list
    const ul = document.createElement('ul');

    trainer.pokemons.forEach(function(poke) {
      const li = document.createElement('li');
      const button2 = document.createElement('button');
      button2.setAttribute('data-pokemon-id', `${poke.species}`);
      button2.innerText = 'Release';
      li.innerText += `${poke.species}`;
      li.appendChild(button2)
      ul.appendChild(li);
    });

    div.className = 'card';
    div.innerHTML = `<p>${trainer.name}</p>`;
    div.appendChild(button);
    div.appendChild(ul);
    main.appendChild(div);
  });
}

fetchTrainers();
