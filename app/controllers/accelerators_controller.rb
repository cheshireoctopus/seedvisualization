class AcceleratorsController < ApplicationController
  def index
    @accelerators = Accelerator.all
  end

  def table
    @accelerators = Accelerator.all
  end
end
