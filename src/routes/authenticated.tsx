import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import PokemonScreen from '../screens/PokemonScreen';

const Stack = createStackNavigator();

const MainStack = () =>(
  <Stack.Navigator 
  initialRouteName='Home'>
    <Stack.Screen name="Home" component={HomeScreen}/>
    <Stack.Screen name="Profile" component={PokemonScreen}/>
  </Stack.Navigator>
)

export default MainStack;
