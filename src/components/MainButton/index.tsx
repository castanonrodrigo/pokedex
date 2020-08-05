import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {fonts} from '../../constants/theme';


interface MainButtonProps{
  submitCallback:()=> void,
  color:string,
  title:string,
  width:string | number,
  height: string | number
}


export default function MainButton({submitCallback, color, title, width, height}:MainButtonProps){
  const [textColor, setTextColor] = useState('transparent');
  useEffect(()=>{
    console.log(color);
    switch (color){
      case 'pink':
        case 'white':
        case 'yellow':
        setTextColor('black');
      break;
      default:
        setTextColor('white');
    }

  },[])
  return(
    <TouchableOpacity
      onPress={submitCallback}
      style={[{backgroundColor:color, width:width, height:height}, styles.container]}
    >
      <Text style={[{color:textColor}, styles.buttonText ]}>{title}</Text>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  container:{
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    margin:5
  },
  buttonText:{
    fontSize:fonts.buttonText.fontSize,
    fontWeight:fonts.buttonText.fontWeight
  }
  
})
