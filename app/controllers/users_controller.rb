# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_user, only: %i[show update destroy]

  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/id
  def show
    render json: @user
  end

  # POST /users
  def create
    is_ok = true
    errors = []
    unless valid_email(params[:email])
      is_ok = false
      errors << 'Enter a vaid email'
    end
    if params[:password] != params[:password_repeat]
      is_ok = false
      errors << 'Passwords must be the same'
    end
    if User.find_by(email: params[:email])
      is_ok = false
      errors << 'Email is already registered'
    end
    if User.find_by(username: params[:username])
      is_ok = false
      errors << 'Username is already in use'
    end
    if params[:username].length < 3 || params[:username].length > 15
      is_ok = false
      errors << 'Username must be between 3 and 15 characters long'
    end
    if params[:password].length < 5
      is_ok = false
      errors << 'Password must be at least 5 characters long'
    end

    if is_ok
      @user = User.new(
        email: params[:email],
        username: params[:username],
        admin: true
      )
      @user.password = params[:password]
      if @user.save
        render json: @user, status: :created, location: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else
      render json: { errors: errors }, status: :ok
    end
  end

  # POST /users
  def login
    errors = []
    @user = User.find_by(email: params[:email])
    if @user
      if @user.password == params[:password]
        token = @user.generate_auth_token
        id = @user.id
        if @user.save
          render json: { token: token, id: id }, status: :created
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      else
        errors << 'Wrong password'
        render json: { errors: errors }, status: :ok
      end
    else
      errors << 'No user found with this email'
      render json: { errors: errors }, status: :ok
    end
  end

  def forgot
    errors = []
    @user = User.find_by(email: params[:email])
    if @user
      @token = @user.generate_reset_token
      if @user.save
        UserMailer.reset_email(@user).deliver_now
        render status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else
      errors << 'No user found with this email'
      render json: { errors: errors }, status: :ok
    end
  end

  def check
    @user = User.find_by(reset_token: params[:token])
    if @user
      render status: :ok
    else
      render status: 400
    end
  end

  def reset
    @user = User.find_by(reset_token: params[:token])
    is_ok = true
    errors = []
    if params[:password] != params[:password_repeat]
      is_ok = false
      errors << 'Passwords must be the same'
    end
    if params[:password].length < 5
      is_ok = false
      errors << 'Password must be at least 5 characters long'
    end
    if is_ok
      @user.password = params[:password]
      @user.reset_token = nil
      if @user.save
        render status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else
      render json: { errors: errors }, status: :ok
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.require(:user).permit(:hashed_password, :email, :reset_token, :admin, :auth_token)
  end

  def register_params
    params.require(:user).permit(:email, :password, :password_repeat)
  end

  def valid_email(email)
    email =~ /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  end
end
