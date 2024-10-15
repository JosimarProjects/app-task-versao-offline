import React, { Component } from "react";
import { ImageBackground, Text, StyleSheet, View, TextInput, TouchableOpacity, Platform, alert, Alert } from "react-native";
import backgroundImage from '../../assets/imgs/login.jpg';  // Verifique o caminho da imagem
import commonStyles from "../commonStyles";  // Certifique-se que o caminho esteja correto
import AuthInput from ".\./components/AuthInput";
import { server, showError, showSuccess } from '../common'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  name: '',
  email: 'jo030191@gmail.com',
  password: '123456',
  confirmPassword: '',
  stageNew: false
}


export default class Auth extends Component {
  state = {
    ...initialState
  }

  signinOrSignup = () => {
    if (this.state.stageNew) {
      this.signup()
    } else {
      this.signin()
    }
  }

  signup = async () => {
    try {
      console.warn(`${server}/signup`)
      console.warn(await axios.post(`${server}/signup`, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPasswordrr
      }))


      showSuccess('Usuario cadastrado!')
      this.setState({ ...initialState })
    }
    catch (e) {
      showError(e)
    }

  }

  signin = async () => {
    try {
    const res =  await axios.post(`${server}/signin`, {
        email: this.state.email,
        password: this.state.password
      } )
      AsyncStorage.setItem('userData', JSON.stringify(res.data))

      axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
      this.props.navigation.navigate('Home', res.data)
      
    }catch (e) {
      showError(e)
    }
    
  }

  render() {

    const validations = []
    validations.push(this.state.email && this.state.email.includes('@'))
    validations.push(this.state.password && this.state.password.length >= 6)

    if(this.state.stageNew) {
      validations.push(this.state.name && this.state.name.trim().length >= 3)
      validations.push(this.state.password && this.state.password === this.state.confirmPassword)
    }

    const validForm = validations.reduce((t,a) => t && a)


    return (
      <ImageBackground source={backgroundImage} style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>{this.state.stageNew ? 'Crie sua conta' : 'Entre com a sua conta'}</Text>
          {
            this.state.stageNew && <AuthInput icon='user' placeholder="Nome" value={this.state.name} style={styles.input}
              onChangeText={name => this.setState({ name })} />
          }
          <AuthInput icon='at' placeholder="E-mail" value={this.state.email} style={styles.input}
            onChangeText={email => this.setState({ email })} />

          <AuthInput icon='lock' placeholder="Senha" value={this.state.password} style={styles.input}
            onChangeText={password => this.setState({ password })} secureTextEntry={true} />

          {
            this.state.stageNew && <AuthInput icon='asterisk'
              placeholder="Confirmação de Senha"
              value={this.state.confirmPassword}
              style={styles.input}
              onChangeText={confirmPassword => this.setState({ confirmPassword })} />
          }
          <TouchableOpacity onPress={this.signinOrSignup}
            disabled={!validForm}
          >
            <View style={[styles.button, validForm ? {} : { backgroundColor: '#AAA' }]}>
              <Text style={styles.buttonText}>{this.state.stageNew ? 'Registrar' : 'Entrar'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => this.setState({ stageNew: !this.state.stageNew })}
          style={{ padding: 10 }}>
          <Text style={styles.buttonText}>{this.state.stageNew ? 'Ja possui conta?' : 'Ainda nao possui conta?'}</Text>

        </TouchableOpacity>
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
