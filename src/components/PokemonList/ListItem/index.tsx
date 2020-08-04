import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {colors} from '../../../constants/theme';
import api from '../../../api';

const ListItem = ({item, index}) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonColor, setPokemonColor] = useState('');
  async function fetchPokemonData(item){
    const response = await api.get(`/pokemon/${item.name}/`); 
    const colorResponse = await api.get(`/pokemon-species/${item.name}`);
    console.log('cor',colorResponse.data.color.name);
    setPokemonColor(colorResponse.data.color.name);
    setPokemonData(response.data.types);

  }
  useEffect(()=>{
    fetchPokemonData(item);
  },[])
  return(
    <View 
      style={style.container}>
      <Image 
        resizeMode='contain'
        source={{
        uri:`https://pokeres.bastionbot.org/images/pokemon/${index + 1}.png`
        }}
        style={{
          height:'60%',
          width:'100%',
          backgroundColor:pokemonColor
        }}
      />
      <Text style={{
        color:'black',
        fontSize:15,
        fontWeight:'500',
        margin:3
        }}>
        {item.name.toUpperCase()} 
      </Text>
      {pokemonData.map((pokemon)=>{
        return(
          <Text key={pokemon.type.name}>
            {pokemon.type.name}
          </Text>
        )

      })}

    </View>

  )
}

const style = StyleSheet.create({
  container:{
    flex:1,
    height:200, 
    borderRadius:4,
    margin:3,
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:colors.lightGray

  }
})

export default ListItem;
