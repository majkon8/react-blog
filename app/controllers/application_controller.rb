class ApplicationController < ActionController::Base
  def fallback_index_html
    render :file => 'public/index.html'
  end
  protect_from_forgery with: :null_session
end
