import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme } from "react-native-paper";
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme,  DarkTheme as NavigationDarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "./context/AuthContext";
import * as Global from "./Global";

// NAVEGACION
import Navegacion1 from "./screens/navegacion/Navegacion1";
import Navegacion2 from "./screens/navegacion/Navegacion2";

const RootStack = createNativeStackNavigator();
const RootStackScreen = ({ usuario }) => (
  <RootStack.Navigator options={{ headerShown: false }}>
    {usuario ? (
      <RootStack.Screen
        name="App"
        component={Navegacion2}
        options={{
          animationEnabled: false,
          headerShown: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={Navegacion1}
        options={{
          animationEnabled: false,
          headerShown: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

export default () => {
  const [showApp, setShowApp] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);


  const login = async  (idusuario) => {
      fetch(Global.API, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          t_o: 5,
          idusuario: idusuario,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson != null) {
            if (responseJson.respuesta !== "error") {
             /*  console.log("Usuario actualizado", responseJson); */
              Global.USUARIO = responseJson.usuario;
              guardarUsuario(responseJson.usuario);
              setUsuario(responseJson.usuario);
            } else {
              console.log("el usuario no existe");
            }
          } else {
            console.log("Error de red. Por favor, intenta de nuevo.");
          }
        })
        .catch((error) => {
          console.log("Error de red. Por favor, intenta de nuevo.");
        });
    
  };

  const obtenerUsuario = async () => {
    try {
      await AsyncStorage.getItem('usuario')
      .then(usuarioStringRecuperado => {
        // Convierte la cadena JSON de vuelta a un objeto
        const usuarioRecuperado = JSON.parse(usuarioStringRecuperado);
        // Usa el objeto recuperado como sea necesario
        //console.log('Usuario recuperado:', usuarioRecuperado);
        /* console.log("idusuario: ", usuarioRecuperado.idusuario) */
        login(usuarioRecuperado.idusuario)
      })
      .catch(error => {
        //console.error('Error al recuperar usuario:', error);
      });
     
    } catch (e) {}
  };

  const iniciar = () => {
    //checarToken();
    /* obtenerTema(); */
    //obtenerIntro();
    obtenerUsuario();
  };

  React.useEffect(() => {
    iniciar();
  }, []);

  
  const authContext = React.useMemo(() => {
    return {
      signIn: (usuario) => {
        Global.USUARIO = usuario;
        guardarUsuario(usuario);
        setUsuario(usuario);
      },
      signUp: (usuario) => {
        //este no se utiliza
        /* Global.USUARIO = usuario;
        guardarUsuario(usuario); */
      },
      signOut: () => {
        Global.USUARIO = [];
        Global.showApp = false;
        setUsuario(null);
        setShowApp(false);
        CerrarSesion();
      },
      toggleTheme: (opt) => {
        console.log("Tema:" + opt);
        if (opt == false) {
          console.log("flaso - claro");
          guardarTema("0");
          setIsDarkTheme(false);
        }
        if (opt == true) {
          console.log("true - obscuro");
          guardarTema("1");
          setIsDarkTheme(true);
        }
      },
    };
  }, []);

  const guardarUsuario = async (usuario) => {
    const usuarioString = JSON.stringify(usuario);
    await AsyncStorage.setItem('usuario', usuarioString)
    .then(() => {
      //console.log('Usuario almacenado exitosamente');
    })
    .catch(error => {
      //console.error('Error al almacenar usuario:', error);
    });
  };

  const CerrarSesion = async () => {
    await AsyncStorage.clear();
  };

  /* const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme; */
  return (
    <PaperProvider /* theme={theme} */>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer /* theme={theme} */>
          <RootStackScreen usuario={usuario} />
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};
