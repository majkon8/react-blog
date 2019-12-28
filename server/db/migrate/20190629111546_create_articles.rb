class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.string :title
      t.datetime :added
      t.integer :user_id
      t.text :content

      t.timestamps
    end
  end
end
