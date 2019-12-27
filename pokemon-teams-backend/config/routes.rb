Rails.application.routes.draw do

  get '/trainers', to: 'trainers#index'
  get '/pokemon', to: 'pokemon#index'
  post '/pokemon', to: 'pokemon#create'
  delete '/pokemon/:id', to: 'pokemon#destroy'
  # resources :pokemon
end
