import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { fonts, colors } from '../../constants/theme';
import {TextInput} from 'react-native-gesture-handler';
import PokemonList from '../../components/PokemonList';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Button title='go to poke' onPress={() => navigation.navigate('Pokedex')} />
      <View style={{height:180,opacity:1,width:'100%', justifyContent:'flex-start',  alignItems:'center' }}>
      <Text style={styles.texto}>What Pokemon are you looking for?</Text>
      <TextInput 
        style={styles.inputStyle} 
        placeholder='insert Pokemon name here' 
      autoCapitalize='none' />
      </View>
      <Text style={styles.texto}>See all Pokemons:</Text>
        <PokemonList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  texto:{
    fontSize:fonts.mainText.fontSize,
    fontWeight:fonts.mainText.fontWeight,
    /* backgroundColor:'red', */
    width:'85%',
    alignSelf:'flex-start',
    padding:20
  },
  inputStyle:{
    height:55,
    width:'90%',
    borderRadius:6,
    borderWidth:3,
    borderColor:colors.lightGray,
    padding:10,
    fontSize:fonts.input.fontSize,
    /* backgroundColor:'red' */

  }
});
