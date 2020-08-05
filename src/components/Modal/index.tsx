import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';

type ModalProps = {visible:boolean};

export default function ModalPicture({visible}:ModalProps){
  return(
    <View style = {styles.container}>
      <Modal isVisible = {visible} >
        <View style={{flex:1}}>
          <Text>eu sou um modal</Text>
        </View>
      </Modal>
    </View>

  )
}

const styles = StyleSheet.create({
  container:{
    height:200,
    width:200
  }
})
