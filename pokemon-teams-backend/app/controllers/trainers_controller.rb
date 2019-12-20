class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
     render json: trainers.to_json(only: %i[id name],
                                  include: { pokemons: { only: %i[id nickname species trainer_id] }})
  end

  def show
    trainer = Trainer.find_by(id: params[:id])
    render json: trainer.to_json(only: %i[id name],
                                 include: { pokemons: { only: %i[id nickname species trainer_id] }}
    )
  end
end
