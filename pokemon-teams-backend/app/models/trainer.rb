class Trainer < ApplicationRecord
  has_many :pokemons

  include ActiveRecordFilters

  def new_pokemon_generator
    new_pokemon = self.pokemons.build
    new_pokemon.species = Faker::Games::Pokemon.name
    new_pokemon.nickname = Faker::Name.first_name
    new_pokemon.save
    return new_pokemon
  end

end

