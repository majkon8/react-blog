class ChangeAuthenticationTokenLimit < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :authenctication_token, :string, :limit => nil
  end
end
