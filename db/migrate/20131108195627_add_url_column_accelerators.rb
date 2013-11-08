class AddUrlColumnAccelerators < ActiveRecord::Migration
  def up
    add_column :accelerators, :url, :text
  end
  def down
    remove_column :accelerators, :url
  end
end
