class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons
    end

    def create
        trainer = Trainer.find_by_id(params[:id])
        pokemon = Pokemon.new_from_faker
        # if trainer exists, add to collection and save
        # if not, just save the new pokemon without a trainer (needed just in case we want to expand functionality later)
        if trainer
            trainer.pokemons.create(pokemon)
        else
            pokemon.save
        end
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
        render json: pokemon
    end

end
