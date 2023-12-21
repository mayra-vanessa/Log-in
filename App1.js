import { StatusBar } from 'expo-status-bar';  
import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';  
import Login from './screens/Login';
import Registro from './screens/Registro';
const { width, height } = Dimensions.get('window')

export default function App() {
   
  return (
    <Login />
  );
}

