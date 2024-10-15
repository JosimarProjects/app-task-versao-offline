import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskList from './screens/TaskList';
import AuthOrApp from './screens/AuthOrApp';
import Auth from './screens/Auth';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Menu from './screens/Menu';
import commonStyles from './commonStyles';

const Drawer = createDrawerNavigator();

// Função para personalizar o conteúdo do Drawer
function CustomDrawerContent(props) {
  return <Menu {...props} />;
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Today"
      drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerLabelStyle: {
          fontFamily: commonStyles.fontFamily,
          fontWeight: 'normal',
          fontSize: 20,
        },
        drawerActiveLabelStyle: {
          fontWeight: 'bold',
          color: '#080',
        },
      }}
    >
      <Drawer.Screen 
        name="Today" 
        options={{ title: 'Hoje' }}
      >
        {(props) => <TaskList {...props} hideDoneTasks={true} title='Hoje' daysAhead={0} />}
      </Drawer.Screen>
      <Drawer.Screen 
        name="Tomorrow" 
        options={{ title: 'Amanhã' }}
      >
        {(props) => <TaskList {...props} hideDoneTasks={true} title='Amanhã' daysAhead={1} />}
      </Drawer.Screen>
      <Drawer.Screen 
        name="Week" 
        options={{ title: 'Semana' }}
      >
        {(props) => <TaskList {...props} hideDoneTasks={true} title='Semana' daysAhead={7} />}
      </Drawer.Screen>
      <Drawer.Screen 
        name="Month" 
        options={{ title: 'Mês' }}
      >
        {(props) => <TaskList {...props} hideDoneTasks={true} title='Mês' daysAhead={30} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

// Cria a instância do stack navigator
const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthOrApp">
      <Stack.Screen 
          name="AuthOrApp" 
          component={AuthOrApp} 
          options={{ headerShown: false }} // Oculta o cabeçalho na tela de autenticação
        />
        <Stack.Screen 
          name="Auth" 
          component={Auth} 
          options={{ headerShown: false }} // Oculta o cabeçalho na tela de autenticação
        />
        <Stack.Screen 
          name="Home" 
          component={DrawerNavigator} 
          options={{ title: 'Task List', headerShown: false }} // Define o título da tela principal e oculta o cabeçalho se desejar
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
