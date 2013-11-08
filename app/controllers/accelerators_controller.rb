class AcceleratorsController < ApplicationController
  def index
    @accelerators = Accelerator.all
  end
end
