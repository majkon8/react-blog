class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :login
      t.string :hashed_password
      t.string :email
      t.string :reset_token
      t.boolean :admin
      t.string :auth_token

      t.timestamps
    end
  end
end
