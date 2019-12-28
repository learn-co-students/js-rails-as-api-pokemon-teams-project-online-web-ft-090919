class Pokemon < ApplicationRecord
  belongs_to :trainer

  validates :nickname, presence: true
  validates :species, presence: true

  validate :trainer_has_less_than_seven_pokemon

  def trainer_has_less_than_seven_pokemon
    binding.pry
    if self.trainer.pokemons.count >= 6
      errors.add(:trainer, "can't have more than six pokemons!")
    end
  end

end
