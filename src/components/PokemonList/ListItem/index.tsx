import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import {colors} from '../../../constants/theme';
import api from '../../../api';
import {useNavigation} from '@react-navigation/native';

const ListItem = ({item, index, inPokedex}) => {
  const navigation = useNavigation();
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonColor, setPokemonColor] = useState('white');
  const mounted = useRef(true);

  let pokemonIndex:number;
  if (inPokedex){
    pokemonIndex = item.index; 
  }else{
    pokemonIndex = index + 1
  }
  
  async function fetchPokemonData(item){
    const response = await api.get(`/pokemon/${item.name}/`); 
    const colorResponse = await api.get(`/pokemon-species/${item.name}`);
    if (mounted.current){
      setPokemonColor(colorResponse.data.color.name);
      setPokemonData(response.data.types);
    }
    console.log('terminou o fetch');

  }

  useEffect(()=>{
    fetchPokemonData(item);
    return function cleanup(){
      mounted.current = false;
    }
  },[])

  return(
    <TouchableOpacity 
      style={styles.container}
      onPress = {() => navigation.navigate('Profile', {pokemonName:item.name, pokemonColor, pokemonIndex: pokemonIndex })}
    >
      <Image 
        resizeMode='contain'
        source={{
          uri:`https://pokeres.bastionbot.org/images/pokemon/${pokemonIndex}.png`
        }}
        style={[ styles.image, {backgroundColor:pokemonColor} ]}
      />
      <Text style={styles.title}>
        {item.name} 
      </Text>
      {pokemonData.map((pokemon)=>{
        return(
          <Text style={styles.text} key={pokemon.type.name}>
            {pokemon.type.name}
          </Text>
        )
      })}

    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    height:220, 
    borderRadius:10,
    margin:3,
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:colors.lightGray
  },
  image:{
    height:'50%',
    width:'100%',
    borderRadius:10
  },
  title:{
    color:'black',
    fontSize:22,
    fontWeight:'600',
    marginTop:10,
    marginBottom:5
  },
  text:{
    color:'#414141',
    fontSize:18
  }
})

export default ListItem;
