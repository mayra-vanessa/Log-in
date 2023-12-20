import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import { LinearGradient } from 'react-native-svg';

export default function Button () {
    return(
        <TouchableOpacity>
            <View>
                colors={['#4c669f','#3b5998','#192f6a']}
                style={StyleSheet.button}
                <text style={StyleSheet.text}>Entrar</text>
            </View>
        </TouchableOpacity>
    );
}
 const styles = StyleSheet.create({
    text: {
        fontSize:14,
        color: 'gray',
        marginTop:20
    },
    button: {
        width: '80%',
        height: 50,
    }
 });
