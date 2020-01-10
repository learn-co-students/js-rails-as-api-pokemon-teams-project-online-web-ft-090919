class TrainersController < ApplicationController

  def index
    trainers = Trainer.all
    render json: TrainerSerializer.new(trainers, options)
  end

  def new_pokemon
    binding.pry
    if trainer
    else
     render json: {error: "Trainer not found", status: "400"}, status: 400
    end

  end

end


