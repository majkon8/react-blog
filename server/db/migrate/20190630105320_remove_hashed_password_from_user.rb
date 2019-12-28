class RemoveHashedPasswordFromUser < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :hashed_password, :string
  end
end
