class PokemonsController < ApplicationController

  def create
    pokemon = Pokemon.create(
      trainer_id: params[:trainer_id],
      nickname: Faker::Name.first_name,
      species: Faker::Games::Pokemon.name
    )
    if pokemon.valid?
      # pokemon.nickname = Faker::Name.first_name
      # pokemon.species = Faker::Games::Pokemon.name
      pokemon.save
      render json: pokemon
    else
      render json: pokemon.errors.full_messages
    end
  end


  def destroy

    pokemon = Pokemon.find_by(id: params[:id])
    if pokemon
      if pokemon.destroy
        render json: pokemon
      else
        render json: pokemon.errors.full_messages
      end
    else
      render json: {'error': "No pokemon with id #{params[:id]} exists!"}
    end
  end

  private

  def pokemon_params
    params.require(:pokemon).permit(:trainer_id)
  end

end
