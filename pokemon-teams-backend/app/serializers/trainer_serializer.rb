class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attribute :name, :pokemon
end
