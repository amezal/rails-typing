Rails.application.routes.draw do
  resources :test_entries
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#index"
  get "/result", to:"home#result", as:"result"
  get "/my_profile", to:"test_entries#my_profile", as:"my_profile"
end
