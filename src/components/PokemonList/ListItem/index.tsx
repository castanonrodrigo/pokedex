import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, Image} from 'react-native';
import api from '../../api';
import {colors} from '../../../constants/theme';

const ListItem = ({item, index}) => {
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
          backgroundColor:'green'
        }}
      />
      <Text>
        {item.name} {index}
      </Text>
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
