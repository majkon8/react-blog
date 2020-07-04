require 'bcrypt'

class User < ActiveRecord::Base

  include BCrypt

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def generate_auth_token
    @token = SecureRandom.base58(48)
    self.authenctication_token = @token
  end

  def generate_reset_token
    @token = SecureRandom.base58(48)
    self.reset_token = @token
  end
  
end