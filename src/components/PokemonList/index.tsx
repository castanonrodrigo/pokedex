import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import api from '../../api';

const PokemonList = () =>{
  const [pokemons, setPokemons] = useState([])
  useEffect(()=>{
    requestPokemons();
  }, [])

  async function requestPokemons(){
    const response = await api.get('/pokemon/');
    console.log('resultado',JSON.stringify(response.data, null, 2));
    setPokemons(response.data.results);

  }
  return(
    <View style={styles.container}>
      <FlatList
        data={pokemons}
        renderItem={({item})=>{
          return(
            <Text>
              {item.name}
            </Text>

          )
        }}
        keyExtractor={item => item.name}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'red'

  }
})

export default PokemonList;
