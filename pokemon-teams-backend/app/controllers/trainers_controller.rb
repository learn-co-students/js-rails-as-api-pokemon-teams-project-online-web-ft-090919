class TrainersController < ApplicationController

  def index
    trainers = Trainer.all

    render json: TrainerSerializer.new(trainers).serializable_hash
  end

  def new_pokemon
    trainer = Trainer.find_by_id(params.require("trainer_id"))
    if trainer
      trainer.new_pokemon_generator
      render json: TrainerSerializer.new(trainer).serializable_hash
    else
     render json: {error: "Trainer not found", status: "400"}, status: 400
    end

  end

end


