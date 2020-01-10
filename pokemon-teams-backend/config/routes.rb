Rails.application.routes.draw do
  
  get '/' => 'trainers#index'
  post '/trainers/new_pokemon' => 'trainers#new_pokemon'
end
