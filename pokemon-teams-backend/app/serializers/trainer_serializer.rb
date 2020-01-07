class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attribute :name, :pokemons
end
