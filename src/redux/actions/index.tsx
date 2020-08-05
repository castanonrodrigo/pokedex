export const selectPokemon = (pokemon) =>({
  type:'ADD_POKEMON',
  payload:pokemon
})

export const removePokemon = (pokemon:number) =>({
  type:'REMOVE_POKEMON',
  payload:pokemon
})
