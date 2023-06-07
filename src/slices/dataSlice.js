import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPokemon, getPokemonDetails } from '../api';
import { setLoading } from './uiSlice';

const initialState = {
  pokemons: [],
  searchPokemonsText: '',
  filteredPokemons: []
};

export const fetchPokemonsWithDetails = createAsyncThunk(
  '',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    const pokemonsRes = await getPokemon();
    const pokemonsDetailed = await Promise.all(
      pokemonsRes.map((pokemon) => getPokemonDetails(pokemon))
    );
    dispatch(setPokemons(pokemonsDetailed));
    dispatch(setLoading(false));
  }
);

export const fetchFilteredPokemons = createAsyncThunk(
  '',
  async (_, { dispatch, getState }) => {
    dispatch(setLoading(true));
    const searchPokemonsText = getState().data.searchPokemonsText;
    const pokemons = getState().data.pokemons;
    const textFilter = searchPokemonsText.toLowerCase();
    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(textFilter)
    );
    dispatch(setFilteredPokemons(filteredPokemons));
    dispatch(setLoading(false));
  }
);

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
    setFavorite: (state, action) => {
      const currentPokemonIndex = state.pokemons.findIndex((pokemon) => {
        return pokemon.id === action.payload.pokemonId;
      });

      if (currentPokemonIndex >= 0) {
        const isFavorite = state.pokemons[currentPokemonIndex].favorite;

        state.pokemons[currentPokemonIndex].favorite = !isFavorite;
      }
    },
    setSearchPokemonsText: (state, action) => {
      state.searchPokemonsText = action.payload;
    },
    setFilteredPokemons: (state, action) => {
      state.filteredPokemons = action.payload;
    },
  },
});

export const {
  setFavorite,
  setPokemons,
  setSearchPokemonsText,
  setFilteredPokemons,
} = dataSlice.actions;

export default dataSlice.reducer;
