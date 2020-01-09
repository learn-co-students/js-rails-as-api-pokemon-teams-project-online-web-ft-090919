class Pokemon < ApplicationRecord
  belongs_to :trainer

  def self.new_from_faker
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    @pokemon = Pokemon.new(nickname: name, species: species)
  end

end
