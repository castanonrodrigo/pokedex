import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native';
import api from '../../api';
import ListItem from './ListItem';

const NUM_COLUMNS = 2;
const PokemonList = () =>{

  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState<Array<Object>>([]);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    requestPokemons();
  }, [])

  async function requestPokemons(){
    if (loading){
      return;
    }else{
      setLoading(true);
    }
    const response = await api.get(`/pokemon/?offset=${offset}&limit=20`);
    setPokemons([...pokemons, ...response.data.results ]);
    setOffset(offset + 20);
    console.log(pokemons);
    setLoading(false);
  }

  function renderFooter(){
    if (!loading){
      return null;
    }
    return (
      <View style= {styles.loading}>
        <ActivityIndicator size='large' />
      </View>

    )
  }
  return(
    <View style={styles.container}>
      <FlatList
        data={pokemons}
        numColumns={NUM_COLUMNS}
        showsVerticalScrollIndicator={false}
        onEndReached = {requestPokemons}
        onEndReachedThreshold= {0.1}
        renderItem={({item, index})=>{
          return(
            <ListItem 
              item={item}
              index={index}
            />
          )
        }}
        keyExtractor={item => item.name}
        ListFooterComponent = {renderFooter}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    padding:10
  },
  loading:{
    height:50
  }
})

export default PokemonList;
