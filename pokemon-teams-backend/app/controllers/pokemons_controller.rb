class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: PokemonSerializer.new(pokemon)
    end
    
    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        pokemon = trainer.pokemon.create(species: Faker::Games::Pokemon.name, nickname: Faker::Name.first_name)
        render json: PokemonSerializer.new(pokemon)
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
    end
end
