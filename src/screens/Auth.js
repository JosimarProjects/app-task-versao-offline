import React, { Component } from "react";
import { ImageBackground, Text, StyleSheet, View, TextInput, TouchableOpacity, Platform } from "react-native";
import backgroundImage from '../../assets/imgs/login.jpg';  // Verifique o caminho da imagem
import commonStyles from "../commonStyles";  // Certifique-se que o caminho esteja correto

export default class Auth extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: true
  }
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>{this.state.stageNew ? 'Crie sua conta' : 'Entre com a sua conta'}</Text>
          {
            this.state.stageNew && <TextInput placeholder="Nome" value={this.state.name} style={styles.input}
              onChangeText={name => this.setState({ name })} />
          }
          <TextInput placeholder="E-mail" value={this.state.email} style={styles.input}
            onChangeText={email => this.setState({ email })} />

          <TextInput placeholder="Senha" value={this.state.password} style={styles.input}
            onChangeText={password => this.setState({ password })} secureTextEntry={true} />

          {
            this.state.stageNew && <TextInput
              placeholder="Confirmação de Senha"
              value={this.state.confirmPassword}
              style={styles.input}
              onChangeText={confirmPassword => this.setState({ confirmPassword })} />
          }
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{this.state.stageNew ? 'Registrar' : 'Entrar'}</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  },
  formContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    width: '90%',
  },
  input: {
    backgroundColor: '#FFF',
    height: 40,
    marginBottom: 10,
    borderRadius: 20,
    textAlign: 'center',
    padding: Platform.OS === 'ios' ? 15 : 0,
  },
  button: {
    backgroundColor: '#080',
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
  },
});
