import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Login from '../auth/Login';
import Registro from '../auth/Registro';



const Stack = createNativeStackNavigator();


function Navegacion_auth() {
  return (
    
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false, headerStyle: {
                backgroundColor: '#fff'
            },
            headerTitleStyle: {
                color: "#171F6D"
            },}}> 
                 
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="Registro" component={Registro} />
                
      </Stack.Navigator>
   
  );
}

export default Navegacion_auth;