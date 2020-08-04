import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import api from '../../api';
import ListItem from './ListItem';

const NUM_COLUMNS = 2;
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
        numColumns={NUM_COLUMNS}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index})=>{
          return(
            <ListItem 
              item={item}
              index={index}
            />
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
    width:'100%',
    padding:10
  }
})

export default PokemonList;
