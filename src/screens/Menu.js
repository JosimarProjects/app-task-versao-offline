import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import commonStyles from '../commonStyles'; // Certifique-se de que o caminho está correto
import { Gravatar } from 'react-native-gravatar';

export default function Menu(props) {
    const { state, navigation, route } = props;

    // Obtém o nome da rota atual
    const currentRouteName = state.routeNames[state.index];

    // Obtém os dados passados via navegação (route.params)

    // Define os itens do menu com seus rótulos e rotas correspondentes
    const menuItems = [
        { label: 'Hoje', route: 'Today' },
        { label: 'Amanhã', route: 'Tomorrow' },
        { label: 'Semana', route: 'Week' },
        { label: 'Mês', route: 'Month' },
    ];

    return (
        <DrawerContentScrollView {...props}>
            {/* Cabeçalho do Menu (Opcional) */}
            <View style={styles.header}>
                <Text style={styles.title}>Meu Menu</Text>
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
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: '#f6f6f6',
        marginBottom: 10,
    },
    headerUser: {
        borderB: 20,
        backgroundColor: '#f6f6f6',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontFamily: commonStyles.fontFamily,
        fontWeight: 'bold',
    },
    label: {
        fontFamily: commonStyles.fontFamily,
        fontWeight: 'normal',
        fontSize: 20,
        color: '#000', // Cor padrão do texto
    },
    activeLabel: {
        fontFamily: commonStyles.fontFamily,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#080', // Verde para indicar ativo
    },
    activeBackground: {
        backgroundColor: '#e0ffe0', // Fundo verde claro para indicar ativo
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
});
