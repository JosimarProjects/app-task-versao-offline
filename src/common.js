import { Alert, Platform } from "react-native";

const server = Platform.OS === 'ios' ? 'http://244.178.44.111:3000':'http://192.168.15.60:3000'

function showError(msg) {
    Alert.alert(`Ops! Ocorreu um erro: ${msg}`);
}   

function showSuccess(msg) {
    Alert.alert(`Sucesso! ${msg}`);
}


export { server, showError, showSuccess }