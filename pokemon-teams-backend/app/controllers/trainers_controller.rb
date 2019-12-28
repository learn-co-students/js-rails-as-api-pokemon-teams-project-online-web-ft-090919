class TrainersController < ApplicationController

  def index
    trainers = Trainer.all
    render json: trainers, include: {pokemons: { except: [:created_at, :updated_at]}}, except: [:updated_at, :created_at]
    # render json: TrainerSerializer.new(trainers)
    # options = {include: [:pokemons]}
    # render json: TrainerSerializer.new(trainers)
  end

  def show
    trainer = Trainer.find_by(id: params[:id])
    render json: trainer, include: {pokemons: { except: [:created_at, :updated_at]}}, except: [:updated_at, :created_at]
    # render json: trainer, include: [:pokemons]
    # options = {include: [:pokemons]}
    # render json: TrainerSerializer.new(trainer, options)
  end

end
