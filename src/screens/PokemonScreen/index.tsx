import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {colors} from '../../../constants/theme';
import api from '../../../api';


export default function PokemonScreen({route}){
  console.log(route);
  return(
    <View style = {[{backgroundColor:route.params.pokemonColor}, styles.container ]}>
      <View style = {styles.infoContainer}>
        <Image
          style={styles.image}
          resizeMode = 'contain'
          source={{
            uri:`https://pokeres.bastionbot.org/images/pokemon/${route.params.pokemonIndex}.png`
          }}
        />
        <Text>
          essa é a tela de perfil do pokemon {route.params.pokemonName}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-end',
  },
  infoContainer:{
    backgroundColor:'white',
    alignItems:'center',
    height:'70%',
    width:'100%',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
  },
  image:{
    alignItems:'center',
    marginTop:-100,
    height:200,
    width:200,
  }
})
