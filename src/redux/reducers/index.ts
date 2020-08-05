import {combineReducers} from 'redux';

const selectPokemonReducer = (state =[], action) => {
  switch (action.type){
    case 'ADD_POKEMON':
      return [...state, action.payload];
    case 'REMOVE_POKEMON':
      return state.filter((pokemon) => pokemon.index !== action.payload);
    default:
      return state;
  }
}

export default combineReducers({
  selectedPokemons:selectPokemonReducer
})


