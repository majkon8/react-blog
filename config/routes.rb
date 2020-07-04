Rails.application.routes.draw do
  resources :comments
  resources :articles
  resources :users
  post '/login' => 'users#login'
  post '/forgot' => 'users#forgot'
  post '/check' => 'users#check'
  post '/reset' => 'users#reset'
  get '/article_comments/:article_id' => 'comments#article_comments'
  delete '/article_comments/:article_id' => 'comments#delete_article_comments'
  delete '/more_comments/:array_of_ids' =>'comments#destroy_more'
  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
