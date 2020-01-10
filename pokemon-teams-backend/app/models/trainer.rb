class Trainer < ApplicationRecord
  has_many :pokemons

  include ActiveRecordFilters

  def new_pokemon_generator
    
  end

end

