class RemoveAddedFromArticles < ActiveRecord::Migration[5.2]
  def change
    remove_column :articles, :added, :datetime
  end
end
