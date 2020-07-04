class CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :update, :destroy]

  # GET /comments
  def index
    @comments = Comment.all

    render json: @comments
  end

  # GET /comments/id
  def show
    render json: @comment
  end

  # GET /article_comments/article_id
  def article_comments
    @comments = Comment.where(article_id: params[:article_id])
    render json: @comments
  end

  #DELETE /article_comments
  def delete_article_comments
    Comment.where(article_id: params[:article_id]).destroy_all
  end

  # POST /comments
  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render json: @comment, status: :created, location: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/1
  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  def destroy
    @comment.destroy
  end

  # DELETE /more_comments/array_of_ids
  def destroy_more
    array = params[:array_of_ids].split(',')
    Comment.where(id: array).destroy_all
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def comment_params
      params.require(:comment).permit(:article_id, :user_id, :content, :response_to, :array_of_ids)
    end
end
