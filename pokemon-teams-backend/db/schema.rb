# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_24_123232) do

  create_table "pokemon", force: :cascade do |t|
    t.string "species"
    t.string "nickname"
    t.integer "trainer_id", null: false
    t.index ["trainer_id"], name: "index_pokemon_on_trainer_id"
  end

  create_table "trainers", force: :cascade do |t|
    t.string "name"
  end

  add_foreign_key "pokemon", "trainers"
end
