class AcceleratorsController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json {render :json => Accelerator.all.to_json}
    end
  end

  def table
    @accelerators = Accelerator.all
  end
end
