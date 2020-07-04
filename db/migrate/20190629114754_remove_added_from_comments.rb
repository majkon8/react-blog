class RemoveAddedFromComments < ActiveRecord::Migration[5.2]
  def change
    remove_column :comments, :added, :datetime
  end
end
