class PokemonsController < ApplicationController

    def create
        trainer = Trainer.find_by(id: params[:trainer_id])

        pokemon = Pokemon.new(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: trainer.id)

        if pokemon.save
            render json: pokemon
        end

    end
    
    def destroy
        pokemon = Pokemon.find_by(id: params[:id]);
        pokemon.destroy
        render json: pokemon
    end
end
