class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons, except: [:created_at, :updated_at]
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon, except: [:created_at, :updated_at]
    end

    def create
        binding.pry
        trainer = Trainer.find_by(id: params[:trainer_id])
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.new(nickname: name, species: species)
        trainer.pokemons << pokemon
        render json: pokemons, except: [:created_at, :updated_at]
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
    end

    private
    def pokemon_params
        params.require(:pokemon).permit(:trainer_id)
    end

end
