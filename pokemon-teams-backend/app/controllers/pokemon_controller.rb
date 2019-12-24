class PokemonController < ApplicationController

  def index
    pokemon = Pokemon.all
    render json: PokemonSerializer.new(pokemon)
  end
end
