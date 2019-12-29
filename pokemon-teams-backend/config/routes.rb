Rails.application.routes.draw do

  
  get '/trainers', to: 'trainers#index'
  get '/pokemon', to: 'pokemons#index'
  post '/pokemon', to: 'pokemons#create'
  delete '/pokemon/:id', to: 'pokemons#destroy'
 

  # resources :pokemons
  # resources :trainers


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
