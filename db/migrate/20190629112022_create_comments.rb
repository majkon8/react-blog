class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.integer :article_id
      t.integer :user_id
      t.datetime :added
      t.text :content
      t.integer :response_to

      t.timestamps
    end
  end
end
