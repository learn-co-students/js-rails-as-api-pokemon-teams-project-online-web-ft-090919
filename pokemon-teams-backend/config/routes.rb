Rails.application.routes.draw do
  # resources :pokemons
  # resources :trainers, only: [:index]

  get '/trainers', to: 'trainers#index'
  get '/pokemon', to: 'pokemon#index'
end
