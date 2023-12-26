import { StatusBar } from 'expo-status-bar';  
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions,TouchableOpacity, ActivityIndicator } from 'react-native';
const { width, height } = Dimensions.get('window')
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from '@react-navigation/native';
import * as Global from "../../Global";

export default function Login() {
  const navigation = useNavigation();
  const { signIn } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const login = () => {
    setError('');
    /* if (username.length === 0 || password.length === 0) {
      setError('Por favor, completa todos los campos.');
    } else if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
    } else { */
      setLoading(true);
      fetch(Global.API, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          t_o: 1,
          correo: username,
          contra: password,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          
          if (responseJson != null) {
            if (responseJson.respuesta !== "error") {
              console.log("Usuario completo", responseJson);
              setTimeout(() => {
                setLoading(false);
                signIn(responseJson.usuario);
              }, 1000);
            } else {
              setLoading(false);
              setError('Usuario o contraseña incorrectos.');
            }
          } else {
            setLoading(false);
            setError('Error de red. Por favor, intenta de nuevo.');
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          setError('Error de red. Por favor, intenta de nuevo.');
        });
    /* } */
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Workflex</Text>
      <Text style={styles.subTitle}>Iniciar sesion</Text>
      <TextInput
        placeholder="Ingresa un correo"
        style={styles.textInput}
        onChangeText={(val) => setusername(val)}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.textInput}
        onChangeText={(val) => setpassword(val)}
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
          }} 
          
          onPress={login}>
        <Text style={{textAlign: 'center'}}>Entrar</Text>
            
        </TouchableOpacity>

        {/* Mensaje de error */}
        {error ? (
            <Text style={{ color: 'red', fontSize: 14, textAlign: 'center', marginTop: 10 }}>{error}</Text>
          ) : null}

          {/* Indicador de carga */}
          {loading ? (
            <ActivityIndicator size="large" color="skyblue" style={{ marginTop: 10 }} />
          ) : null}
      
      <Text style={styles.subTitle2}>No tienes cuenta</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text className="text-sky-600">Registrarse</Text>
      </TouchableOpacity>

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
    alignSelf: 'center',
    textAlign:'center',
    padding: 10,
    
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  button: {
    width: '80%',
    height: 50,
  },
});