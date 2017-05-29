Rails.application.routes.draw do
  root 'home#show'
  get 'channels', to: 'home#show'
  get 'login', to: 'home#login'
end
