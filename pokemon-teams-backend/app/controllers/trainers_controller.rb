class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: TrainerSerializer.new(trainers).to_serialized_json
    end

    # def create_pokemon
    #     @trainer = Trainer.find_by_id(params[:id])
    #     # redirect to 'PokemonsController#create'
    # end
    
end
