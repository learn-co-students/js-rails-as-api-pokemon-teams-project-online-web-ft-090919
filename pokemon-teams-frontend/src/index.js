
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function getData(url) {
      fetch(url)
        .then(response => response.json())
        .then(function(json){
            createCard(json);
        }).catch(err => {
            console.log(err);
        })
}


function createCard(trainers) {
    
    for(const trainer of trainers) {
        let pokemons = trainer.pokemons;
    
        let main = document.querySelector('main')
        let div = document.createElement('div');
            div.setAttribute('class', 'card');
        let p = document.createElement('p');
            p.innerHTML = trainer.name;
        let button = document.createElement('button');
            button.setAttribute('data-trainer-id', trainer.id);
            button.innerHTML = 'Add Pokemon';
            button.addEventListener('click', function(event){
                    addPoke(event);
            });
        let ul = document.createElement('ul');
            ul.setAttribute('data-id', trainer.id);
        let li = document.createElement('li');

        

        main.appendChild(div);
        div.appendChild(p);
        div.appendChild(button);
        


        for(const pokemon of pokemons){
            let li = document.createElement('li');
                li.setAttribute('id', pokemon.id)
            let button = document.createElement('button');

            li.innerHTML = `${pokemon.nickname} (${pokemon.species}) `;
            button.setAttribute('class', 'release');
            button.setAttribute('data-pokemon-id', pokemon.id);
            button.innerHTML = 'Release';
            button.addEventListener('click', function(event){
                releasePoke(event);
            });
            li.appendChild(button);
            ul.appendChild(li);
            div.appendChild(ul);
        }
    }
}




function releasePoke(event) {
    fetch(`${POKEMONS_URL}/${event.target.getAttribute('data-pokemon-id')}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    }).then(function(response){
        return response.json();
    }).then(function(data){
        let ul = document.querySelector('ul[data-id=' + CSS.escape(data.trainer_id)+ ']');
        let li = document.querySelector('#' + CSS.escape(data.id));
        console.log(ul)
        ul.removeChild(li);
        
    })
}


function addPoke(event) {
    fetch(`${BASE_URL}/trainers/${event.target.getAttribute('data-trainer-id')}/pokemons`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST'
    }).then(response => response.json())
      .then(data => {
        let ul = document.querySelector('ul[data-id=' + CSS.escape(data.trainer_id)+ ']');
        let li = document.createElement('li');
            li.setAttribute('id', data.id);
        li.innerHTML = `${data.nickname} (${data.species})`;
        let button = document.createElement('button');
            button.setAttribute('class', 'release');
            button.setAttribute('data-pokemon-id', data.id);
            button.innerHTML = 'Release';
            button.addEventListener('click', function(event){
                releasePoke(event);
            });
            li.appendChild(button);
        ul.appendChild(li);
        console.log(data);
      })
}

getData(TRAINERS_URL);