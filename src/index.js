import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { pokemonsReducer } from './reducers/pokemons';
import { logger } from './middlewares';
import { Provider } from 'react-redux';
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from 'redux';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const composeEnhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(logger)
);

const store = createStore(pokemonsReducer, composeEnhancers);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
