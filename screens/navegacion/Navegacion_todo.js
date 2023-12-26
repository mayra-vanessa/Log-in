import * as React from 'react';
import { View, Text, Dimensions} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatusBar } from "expo-status-bar";
import HomeScreen from '../HomeScreen';
import Producto from '../Producto';
import Screen2 from '../Screen2';
import Screen3 from '../Screen3';
import Submenu1Screen from '../Submenu1Screen';

/* import PerfilScreen from '../auth/PerfilScreen'; */

import { useNavigation } from '@react-navigation/native';

import { Modal,List } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthContext } from "../../context/AuthContext";

import {PRIMARYCOLOR} from '../../Constants.js';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const window= Dimensions.get("window");

function Navegacionhome(){
  return(
    <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{headerShown: false, headerStyle: {
      backgroundColor: '#fff'
  },
  headerTitleStyle: {
      color: "#171F6D"
  },}}> 
       
<Stack.Screen name="HomeScreen" component={HomeScreen} />

<Stack.Screen name="Producto" component={Producto} />

</Stack.Navigator>
  );
}

function Navegacion2(){
  return(
    <Stack.Navigator initialRouteName='Screen2' screenOptions={{headerShown: false, headerStyle: {
      backgroundColor: '#fff'
  },
  headerTitleStyle: {
      color: "#171F6D"
  },}}> 
       
<Stack.Screen name="Screen2" component={Screen2} />

      
</Stack.Navigator>
  );
}

function Navegacion3(){
  return(
    <Stack.Navigator initialRouteName='Screen3' screenOptions={{headerShown: false, headerStyle: {
      backgroundColor: '#fff'
  },
  headerTitleStyle: {
      color: "#171F6D"
  },}}> 
       
<Stack.Screen name="Screen3" component={Screen3} />

      
</Stack.Navigator>
  );
}



function Navegacion_todo() {

const [visible,setVisible]=React.useState(false);
const [expandedAccordion, setExpandedAccordion] =React.useState(null);
const MenuScreen = () => <Text>Menu Screen</Text>;
const containerStyle = { backgroundColor: 'transparent' };

const navigation= useNavigation();

const { signOut } = React.useContext(AuthContext);

const showModal = () => setVisible(true);
    const hideModal = () => {
        setVisible(false);
        setExpandedAccordion(null);
    }

const cerrarsesion= () =>{
  setVisible(false);
  setExpandedAccordion(null);
  signOut();
};

const Submenu1= () =>{ 
  setVisible(false);
  setExpandedAccordion(null); 
navigation.navigate(Submenu1Screen);
};

  return (
    <SafeAreaProvider>
       <StatusBar
          backgroundColor={PRIMARYCOLOR}
          animated={true}
          barStyle={'light-content'}
        />
     <Tab.Navigator  screenOptions={{
        tabBarActiveTintColor: PRIMARYCOLOR,
        tabBarActiveBackgroundColor: '#fff',
        tabBarInactiveTintColor: 'gray',
        tabBarInactiveBackgroundColor: '#fff',
        headerShown: true,
      }}>
     <Tab.Screen name="Navegacionhome" component={Navegacionhome} options={{ title: 'Inicio', headerShown: false, headerTitleAlign: 'center',headerTintColor: 'white',headerTitleStyle: {fontSize: 24,}, tabBarIcon: ({ color, size }) => <Icon name={'home'} color={color} size={size}  />, }} />
     <Tab.Screen name="segunda" component={Navegacion2} options={{ title: 'pantalla 2', headerShown: true,headerTitleAlign: 'center',headerTintColor: 'white',headerTitleStyle: {fontSize: 24,},headerStyle:{backgroundColor:PRIMARYCOLOR}, tabBarIcon: ({ color, size }) => <Icon name={'alarm-light-outline'} color={color} size={size}  />, }} />
     <Tab.Screen name="tercera" component={Navegacion3} options={{ title: 'pantalla 3', headerShown: true,headerTitleAlign: 'center',headerTintColor: 'white',headerTitleStyle: {fontSize: 24,},headerStyle:{backgroundColor:PRIMARYCOLOR}, tabBarIcon: ({ color, size }) => <Icon name={'chat'} color={color} size={size}  />, }} />
     <Tab.Screen name="Menu" component={MenuScreen} listeners={({ navigation }) => ({ tabPress: (e) => { e.preventDefault(); }, })} options={{ tabBarOnPress: () => null, tabBarAccessibilityLabel: '', headerShown: false, tabBarVisible: false, tabBarIcon: ({ color, size }) => <Icon onPress={showModal} name={'menu'} color={color} size={size}  />, }} />
     </Tab.Navigator>

    <Modal style={{ position: 'absolute', width: window.width / 1, justifyContent: 'flex-end', padding: 41, paddingLeft: 0, paddingRight: 0, paddingTop: 0 }} visible={visible} onDismiss={hideModal} /*contentContainerStyle={containerStyle}*/>
    <List.Section style={{ backgroundColor: "#fff" }} >
 
     <List.Accordion
        style={{ height: window.height / 11 }}
        titleStyle={{ fontSize: window.width / 30, color: "#171F6D" }}
        title="Menu 1"
        expanded={expandedAccordion === 'Menu1'}
        onPress={() => setExpandedAccordion('Menu1')}
        left={props => <List.Icon {...props} icon={() => <Icon name={'google-analytics'} size={window.height / 39} backgroundColor={"#fff"} color={"#777777"} />} />}>
        <List.Item style={{ backgroundColor: "#fff", height: window.height / 16, paddingLeft: window.width / 30 }} titleStyle={{ fontSize: window.width / 35, color: "#171F6D" }} onPress={Submenu1} title="Submenu 1" />
        <List.Item style={{ backgroundColor: "#fff", height: window.height / 16, paddingLeft: window.width / 30 }} titleStyle={{ fontSize: window.width / 35, color: "#171F6D" }} /*onPress={MisComprass}*/ title="Submenu 2 " />
        <List.Item style={{ backgroundColor: "#fff", height: window.height / 16, paddingLeft: window.width / 30 }} titleStyle={{ fontSize: window.width / 35, color: "#171F6D" }} /*onPress={CancelarRecargaRecurrente}*/ title="Submenu 3" />

    </List.Accordion>
   
    <List.Accordion
        style={{ height: window.height / 11 }}
        titleStyle={{ fontSize: window.width / 30, color: "#171F6D" }}
        title="Configuración y Privacidad"
        expanded={expandedAccordion === 'Configuración'}
        onPress={() => setExpandedAccordion('Configuración')}
        left={props => <List.Icon {...props} icon={() => <Icon name={'google-analytics'} size={window.height / 39} backgroundColor={"#fff"} color={"#777777"} />} />}>
        {/* <List.Item style={{ backgroundColor: "#fff", height: window.height / 16, paddingLeft: window.width / 30 }} titleStyle={{ fontSize: window.width / 35, color: "#171F6D" }} onPress={RecuperarPass} title="Cambiar Contraseña" /> */}
        <List.Item style={{ backgroundColor: "#fff", height: window.height / 16, paddingLeft: window.width / 30 }} titleStyle={{ fontSize: window.width / 35, color: "#171F6D" }} onPress={cerrarsesion} title="Cerrar Sesión" />
        <List.Item style={{ backgroundColor: "#fff", height: window.height / 16, paddingLeft: window.width / 30 }} titleStyle={{ fontSize: window.width / 35, color: "#171F6D" }} /*onPress={EliminarCuenta}*/ title="Eliminar mi cuenta" />

    </List.Accordion>
</List.Section>
</Modal>



</SafeAreaProvider>

  );
}

export default Navegacion_todo;