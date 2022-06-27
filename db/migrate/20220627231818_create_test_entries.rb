class CreateTestEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :test_entries do |t|
      t.integer :wpm
      t.integer :accuracy

      t.timestamps
    end
  end
end
