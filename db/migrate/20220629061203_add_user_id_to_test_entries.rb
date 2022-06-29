class AddUserIdToTestEntries < ActiveRecord::Migration[7.0]
  def change
    add_column :test_entries, :user_id, :integer
    add_index :test_entries, :user_id
  end
end
