class AddAuthenticationTokenToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :authenctication_token, :string, limit: 30
    add_index :users, :authenctication_token, unique: true
  end
end
