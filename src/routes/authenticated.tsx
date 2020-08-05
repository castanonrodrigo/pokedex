import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import PokemonScreen from '../screens/PokemonScreen';
import CameraScreen from '../screens/CameraScreen';
import MyPokedexScreen from '../screens/MyPokedexScreen';

const Stack = createStackNavigator();

const MainStack = () =>(
  <Stack.Navigator 
  initialRouteName='Home'>
    <Stack.Screen name="Home" component={HomeScreen}/>
    <Stack.Screen name="Profile" component={PokemonScreen}/>
    <Stack.Screen name="Camera" component={CameraScreen}/>
    <Stack.Screen name="Pokedex" component={MyPokedexScreen}/>
  </Stack.Navigator>
)

export default MainStack;
