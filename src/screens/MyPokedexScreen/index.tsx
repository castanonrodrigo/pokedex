import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PokemonList from '../../components/PokemonList';

export default function MyPokedexScreen(){
  return(
    <View style={styles.container}>
      <PokemonList inPokedex={true} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'yellow'
  }
})
