class CreateAccelerators < ActiveRecord::Migration
  def change
    create_table :accelerators do |t|
      t.string :name
      t.string :city
      t.string :state
      t.float :latitude
      t.float :longitude
      t.integer :companies
      t.integer :exits
      t.integer :funding
      t.integer :average

      t.timestamps
    end
  end
end
