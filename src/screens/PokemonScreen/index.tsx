import React, { useState,  useEffect } from 'react';
import { StyleSheet, Text, View,  Image, TouchableOpacity } from 'react-native';
import {fonts} from '../../constants/theme';
import {RectButton} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import MainButton from '../../components/MainButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {selectPokemon, removePokemon} from '../../redux/actions';
import {FileSystem} from 'react-native-unimodules';


export default function PokemonScreen({route }){

  const dispatch = useDispatch();
  const selectedPokemons = useSelector((state) => state.selectedPokemons);
  const [visible, setVisible] = useState(false);
  const [inPokedex, setInPokedex] = useState<boolean>();
  const [picURI, setPicURI] = useState('');
  const navigation = useNavigation();

  useEffect(()=>{
    const inPokedex = selectedPokemons.find((element:{name:string, index:number}) => element.name === route.params.pokemonName);
    console.log(inPokedex);
    if (inPokedex){
      setInPokedex(true);
      setPicURI(inPokedex.pictureURI);
    }else{
      setInPokedex(false);
    }
  })

  function goToCamera(){
    setVisible(false);
    navigation.navigate('Camera', {
      pokemonName:route.params.pokemonName,
      pokemonIndex:route.params.pokemonIndex
    });
  }
  function removePictureDirectory(){

    FileSystem.deleteAsync(`${FileSystem.documentDirectory}/${route.params.pokemonName}/`)
    .then((success)=> console.log('diretorio apagado', success))
    .catch(err=>console.log(err));
  }

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
          <Text style={styles.title}>
          {route.params.pokemonName}
          </Text>
            {inPokedex ?  <RectButton 
          onPress={() => { 
            removePictureDirectory();
            dispatch(removePokemon(route.params.pokemonIndex)) }}
            style={[{backgroundColor:'red'}, styles.button ]}
            >
              <Text style={styles.buttonText}>REMOVE FROM POKEDEX</Text>
            </RectButton>
                :
                <RectButton 
                onPress={() => setVisible(true)}
                  style={[{backgroundColor:route.params.pokemonColor}, styles.button ]}
                >
                  <Text style={styles.buttonText}>
                    ADD TO MY POKEDEX
                  </Text>
                </RectButton>
          }
          <Modal 
            useNativeDriver={true}
            onBackdropPress = {() => setVisible(false)}
            onBackButtonPress = {() => setVisible(false)}
            animationInTiming = {500}
            isVisible={visible}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                Add a picture of your Pokemon!
              </Text>
              <View style={styles.modalButtonsContainer}>
                <MainButton
                  submitCallback = {() => goToCamera()}
                  color={route.params.pokemonColor}
                  title='Take a picture'
                  width='80%'
                  height={50}
                />
                <MainButton
                  submitCallback = {() => dispatch(selectPokemon({
                    name:route.params.pokemonName,
                    index:route.params.pokemonIndex
                  }))}
                  color={route.params.pokemonColor}
                  title='Choose from galery'
                  width='80%'
                  height={50}
                />
              </View>
            </View>
          </Modal>
          {inPokedex ? <Image
            resizeMode='contain'
            source={{
              uri:picURI
            }}
            style={{height:400, width:'70%', backgroundColor:'gray', margin:10, borderRadius:10}}
          />
          :
            null}
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
    marginTop:-100,
    height:200,
    width:200,
  },
  title:{
    fontFamily:'Roboto',
    marginTop:10,
    fontSize:fonts.mainText.fontSize,
    fontWeight:fonts.mainText.fontWeight,
    color:fonts.mainText.color
  },
  button:{
    marginTop:15,
    width:'70%',
    height:50,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center'

  },
  buttonText:{
    fontSize:fonts.buttonText.fontSize,
    fontWeight:fonts.buttonText.fontWeight,
  },
  modalContainer:{
    height:'60%',
    width:'80%',
    backgroundColor:'white',
    alignSelf:'center',
    borderRadius: 10,
    padding:10
  },
  modalTitle:{
    fontSize:fonts.mainText.fontSize - 3,
    fontWeight:fonts.mainText.fontWeight,
    width:'80%',
    alignSelf:'center',
  },
  modalButtonsContainer:{
    alignItems:'center',
    flex:1,
    justifyContent:'space-evenly'
  }
})
