import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './authenticated';


export default function MyApp(){
  return(
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  )

}
