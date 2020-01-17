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
        trainer = Trainer.find_by(id: params[:trainer_id])
        if trainer.pokemons.length < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.new(nickname: name, species: species)
            trainer.pokemons << pokemon
        end
        redirect_to pokemons_path
        # render json: pokemons, except: [:created_at, :updated_at]
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
