import React, {useRef, useState} from 'react';
import {FileSystem} from 'react-native-unimodules';
import { StyleSheet, Text, View, Image,TouchableOpacity, ActivityIndicator } from 'react-native';
import {RNCamera} from 'react-native-camera';
import {fonts} from '../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {selectPokemon} from '../../redux/actions';

export default function CameraScreen({route}){
  console.log(route.params);
  const dispatch = useDispatch();
  const [photoURI, setPhotoURI] = useState('');
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<Object | null>()
  console.log(route.params);

  function submitPic(){
    console.log('uri local', photoURI);
    FileSystem.getFreeDiskStorageAsync().then(( freeDisk )=>{
      console.log(freeDisk);
    })
    FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}/${route.params.pokemonName}/`).then((alo) => {
      console.log(alo);
    }).catch((err)=>{console.log(err)})

    const fileSystemURI = `${FileSystem.documentDirectory}/${route.params.pokemonName}/picture.jpg`

    FileSystem.copyAsync({
      from: photoURI,
      to: fileSystemURI
    }).then((sucesso)=>{console.log('sucesso',sucesso)}).catch((err)=>{console.log(err)})

    FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}/bulbasaur`).then((teste) => {
      console.log(teste);
    }).catch((err) =>{console.log(err)})
    const path = FileSystem.documentDirectory;
    console.log(FileSystem.documentDirectory);
    dispatch(selectPokemon({
      name:route.params.pokemonName,
      index:route.params.pokemonIndex,
      pictureURI:fileSystemURI
    }))
  }

  async function takePicture(){
    setLoading(true);
    console.log(cameraRef.current);
    if(cameraRef.current){
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setPhotoURI(data.uri);
      console.log(photoURI);
    }
    setLoading(false);
  }
  return(
    <View style={styles.container}>
      {photoURI ?  <Image 
        source={{
          uri:photoURI
        }}
        style={styles.image}/>
        :
        <View style={{ height:'80%', width:'100%' }}>
          <RNCamera
            ref = {(ref) => {
              cameraRef.current = ref
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
          />
        </View>
      }
      {photoURI ? <LinearGradient  colors={['rgba(0,0,0,0)','rgba(0,0,0,1)']} style={styles.previewToSubmitContainer}>
        <TouchableOpacity
          onPress = {submitPic}
          style={styles.button}>
          {loading ? <ActivityIndicator /> :
          <Text style={styles.buttonText}>Submit Picture</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity
          onPress = {() => setPhotoURI('')}
          style={styles.button}>
          {loading ? <ActivityIndicator /> :
          <Text style={styles.buttonText}>Change Pic</Text>
          }
        </TouchableOpacity>
      </LinearGradient>
      :
      <TouchableOpacity
        onPress = {takePicture}
        style={[{position:'absolute',bottom:10}, styles.button ]}>
        {loading ? <ActivityIndicator /> :
        <Text style={styles.buttonText}>
          Take Pic
        </Text>
        }
      </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',

  },
  preview:{
    backgroundColor:'green',
    height:'80%',
    width:'100%',
  },
  image:{
    height:'80%',
    flex:1,
    width:'100%'
  },
  button:{
    backgroundColor:'gray',
    width:'40%',
    height:50,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
  },
  buttonText:{
    fontSize:fonts.buttonText.fontSize,
    fontWeight:fonts.buttonText.fontWeight,
    color:'white',
  },
  previewToSubmitContainer:{
    flexDirection:'row',
    width:'100%',
    height:100,
    alignItems:'center',
    justifyContent:'space-around',
    /* backgroundColor:'red', */
    position:'absolute',
    bottom:0,
  }
})
