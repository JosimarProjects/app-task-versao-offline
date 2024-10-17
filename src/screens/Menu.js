import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import commonStyles from '../commonStyles'; // Certifique-se de que o caminho está correto
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Menu(props) {
    const [userData, setUserData] = useState(null); // Estado para armazenar dados do usuário

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUserData = await AsyncStorage.getItem('userData');
            setUserData( JSON.parse(storedUserData)); // Atualiza o estado com os dados do usuário
        };
        fetchUserData();
    }, []);

    const logout = async () => {
        delete axios.defaults.headers.common['Authorization'];
        AsyncStorage.removeItem('userData');
        props.navigation.navigate('Auth');
    };

    const { state, navigation } = props;

    // Obtém o nome da rota atual
    const currentRouteName = state.routeNames[state.index];

    // Define os itens do menu com seus rótulos e rotas correspondentes
    const menuItems = [
        { label: 'Hoje', route: 'Today' },
        { label: 'Amanhã', route: 'Tomorrow' },
        { label: 'Semana', route: 'Week' },
        { label: 'Mês', route: 'Month' },
    ];

    return (
        <DrawerContentScrollView {...props}>
            {/* Cabeçalho do Menu */}
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
            </View>
            <View style={styles.userInfoSection}>
                {/* Avatar, Nome e Email do usuário */}
                <Image
                    source={{ uri: 'https://www.cod3r.com.br/curso.jpg' }} // Substitua por uma URL real
                    style={styles.avatar}
                />
                <Text style={styles.name}>{userData ? userData.name : 'Carregando...'}</Text>
                <Text style={styles.email}>{userData ? userData.email : 'Carregando...'}</Text>
            </View>

            {/* Renderiza cada item do menu */}
            {menuItems.map((item, index) => {
                const isFocused = currentRouteName === item.route;
                return (
                    <View key={index}>
                        <DrawerItem
                            label={item.label}
                            labelStyle={isFocused ? styles.activeLabel : styles.label}
                            onPress={() => navigation.navigate(item.route)}
                            style={isFocused ? styles.activeBackground : null}
                        />
                    </View>
                );
            })}

            {/* Botão de Logout */}
            <TouchableOpacity onPress={logout}>
                <View style={styles.logoutIcon}>
                    <Icon name="sign-out" size={30} color="#fff" />
                    <Text style={styles.logoutText}>Sair</Text>
                </View>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: '#f6f6f6',
        marginBottom: 20,
    },
    userInfoSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    email: {
        fontSize: 14,
        color: '#777',
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        color: '#333',
        fontFamily: commonStyles.fontFamily,
        fontWeight: 'bold',
        textAlign: 'center', // Centraliza o texto
    },
    label: {
        fontFamily: commonStyles.fontFamily,
        fontWeight: '500',
        fontSize: 18,
        color: '#333', // Cor cinza para o texto padrão
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    activeLabel: {
        fontFamily: commonStyles.fontFamily,
        fontWeight: '700',
        fontSize: 18,
        color: '#3b5998', // Azul mais escuro para o item ativo
    },
    activeBackground: {
        backgroundColor: '#d4e6fb', // Azul claro para o fundo do item ativo
        borderRadius: 8,
        marginHorizontal: 10,
    },
    logoutIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginHorizontal: 15,
        backgroundColor: '#f44336', // Vermelho para o botão de logout
        borderRadius: 8,
        justifyContent: 'center',
    },
    logoutText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff', // Texto branco no botão de logout
    },
});
