Structure:

'server' directory contains all server-side code
  - server.js is the entry point to server-side
  - routes directory contains all routing logic
  - models directory contains all Mongo models

'data' directory contains all MongoDB files
  - everything is generated automatically, please don't touch them

'client' directory contains all client-side code
  - index.jsx is the entry point to client-side
  - actions directory contains all action creators for Redux
  - components directory contains all 'dumb' React components
  - containers directory contains all functionality and Redux stuff etc for React components
  - reducers directory contains all Redux reducers

Run the app:

  1. When running the app locally, simply use your MongoDB instance 'testiredux' and run it.
  2. Run `npm run dev` to open the development environment -- includes babel-node and Nodemon for rapid development and debugging.
  3. When building for production, use `npm run web` -- Procfile contains the necessary scripts for running the service in Heroku
