SeedVisualization::Application.routes.draw do

  root 'accelerators#index'

  get '/tables' => 'accelerators#table'

end
