class PokemonsController < ApplicationController

  def index
    pokemons = Pokemon.all
    render json: pokemons.to_json(only: %i[id species nickname])
  end

  def create
    pokemon = Pokemon.create
  end

  private

  #def pokemon_params
  #
  #end

end
