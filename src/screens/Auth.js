import React, { Component } from "react";
import { ImageBackground, Text, StyleSheet } from "react-native";
import backgroundImage from '../../assets/imgs/login.jpg';  // Verifique o caminho da imagem
import commonStyles from "../commonStyles";  // Certifique-se que o caminho esteja correto

export default class Auth extends Component {
    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({ 
    
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 70,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});
