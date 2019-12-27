Rails.application.routes.draw do
  resources :trainers, only: [:index] do
    resources :pokemons, only: [:create]
  end
  resources :pokemons, only: [:new, :create, :destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

end
