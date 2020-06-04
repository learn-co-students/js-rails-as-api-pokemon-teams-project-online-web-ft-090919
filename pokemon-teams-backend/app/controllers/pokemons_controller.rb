class PokemonsController < ApplicationController
  def release_pokemon
    pokemon = Pokemon.find_by_id(params.require("pokemon_id"))
    trainer = pokemon.trainer

    if pokemon && trainer
      pokemon.destroy
      render json: TrainerSerializer.new(trainer).serializable_hash
    else
     render json: {error: "Pokemon not found", status: "400"}, status: 400
    end

  end
end
