class CreatePokemon < ActiveRecord::Migration[6.0]
  def change
    create_table :pokemon do |t|
      t.string :species
      t.string :nickname
      t.references :trainer, null: false, foreign_key: true
    end
  end
end
