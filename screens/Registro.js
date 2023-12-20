import { StatusBar } from 'expo-status-bar';  
import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';  
const { width, height } = Dimensions.get('window')

export default function Registro() {
   
  
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Workflex</Text>
      <Text style={styles.subTitle}>registrate</Text>
      <TextInput
        placeholder="Ingresa tu nombre completo"
        style={styles.textInput}
      />
      <TextInput
        placeholder="Ingresa un correo"
        style={styles.textInput}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.textInput}
      />
            <TouchableOpacity
            
            /*  colors={['#4c669f','#3b5998','#192f6a']} */
             style={{
               backgroundColor: '#FFB534',
               marginTop:20,
               width: '70%',
               height: 50,
               borderRadius:15,
               borderWidth:2,
               borderColor:'black',
               justifyContent:'center'
               }} >
             <Text style={{textAlign: 'center'}}>Entrar</Text>
         
     </TouchableOpacity>
      
      <Text style={styles.subTitle2}>No tienes cuenta, registrate</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B4FF9F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 60,
    color: '#34434D', 
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 20,
    color: 'gray'
  }, 

  subTitle2: {
    fontSize: 15,
    color: 'gray',
    marginTop: 40,
  },
  textInput: {
    padding: 10,
    paddingStart: 20,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
  }
});