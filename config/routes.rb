Rails.application.routes.draw do
  # resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy, :show]
    resources :albums, only: [:index, :show]
    resources :artists, only: [:index, :show]
    resources :songs, only: [:index, :show]
    resources :playlists
    resources :playlist_songs, only: [:index, :create, :destroy, :show]
  end 

  get '*path', to: "static_pages#frontend_index"
  
end



