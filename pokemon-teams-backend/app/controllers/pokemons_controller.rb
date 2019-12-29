class PokemonsController < ApplicationController

    def index 
        pokemon = Pokemon.all
        render json: PokemonSerializer.new(pokemon)
    end 

    def create 
        new_pokemon = Pokemon.create_new(params[:id])

        if new_pokemon 
            render json: PokemonSerializer.new(new_pokemon)
        else
            render json: { message: "Could not create a new Pokemon." } 
        end 
    end 

    def destroy
        pokemon = Pokemon.find(params[:id])

        if pokemon
            pokemon.destroy
        else 
            render json: { message: "Couldn't find that Pokemon." }
        end 
    end 

end

