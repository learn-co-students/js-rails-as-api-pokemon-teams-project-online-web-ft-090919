class TrainerSerializer
  include FastJsonapi::ObjectSerializer

  has_many :pokemons

  attributes :name

   attribute :pokemons do |object|
     object.filtered_api_call(:pokemons, [:id, :nickname, :species])
   end

 end
