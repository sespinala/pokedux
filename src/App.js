import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Col, Spin } from 'antd';
import { Searcher } from './components/Searcher';
import { PokemonList } from './components/PokemonList';
import logo from './static/logo.svg';
import './App.css';
import {
  fetchFilteredPokemons,
  fetchPokemonsWithDetails,
} from './slices/dataSlice';

function App() {
  const pokemons = useSelector((state) => state.data.pokemons, shallowEqual);
  const filteredPokemons = useSelector(
    (state) => state.data.filteredPokemons,
    shallowEqual
  );
  const loading = useSelector((state) => state.ui.loading);
  const searchPokemonsText = useSelector(
    (state) => state.data.searchPokemonsText
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchPokemonsText.length && !pokemons.length) {
      dispatch(fetchPokemonsWithDetails());
    }
    dispatch(fetchFilteredPokemons())
  }, [searchPokemonsText]);

  return (
    <div className='App'>
      <Col
        span={4}
        offset={10}
      >
        <img
          src={logo}
          alt='Pokedux'
        />
      </Col>
      <Col
        span={8}
        offset={8}
      >
        <Searcher />
      </Col>
      {loading ? (
        <Col offset={12}>
          <Spin
            spinning
            size='large'
          />
        </Col>
      ) : (
        <PokemonList
          pokemons={searchPokemonsText.length ? filteredPokemons : pokemons}
        />
      )}
    </div>
  );
}

export default App;
