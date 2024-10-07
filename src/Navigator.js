import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskList from './screens/TaskList';
import Auth from './screens/Auth';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

// Definir as telas do drawer diretamente no Drawer.Navigator
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen 
        name="Today" 
        options={{ title: 'Hoje' }}
        children={(props) => <TaskList {...props} hideDoneTasks={true} title='Hoje' daysAhead={0} />}
      />
      <Drawer.Screen 
        name="Tomorrow" 
        options={{ title: 'Amanhã' }}
        children={(props) => <TaskList {...props} hideDoneTasks={true} title='Amanhã' daysAhead={1} />}
      />
      <Drawer.Screen 
        name="Week" 
        options={{ title: 'Semana' }}
        children={(props) => <TaskList {...props} hideDoneTasks={true} title='Semana' daysAhead={7} />}
      />
      <Drawer.Screen 
        name="Month" 
        options={{ title: 'Mês' }}
        children={(props) => <TaskList {...props} hideDoneTasks={true} title='Mês' daysAhead={30} />}
      />
    </Drawer.Navigator>
  );
}

// Cria a instância do stack navigator
const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen 
          name="Auth" 
          component={Auth} 
          options={{ headerShown: false }} // Oculta o cabeçalho na tela de autenticação
        />
        <Stack.Screen 
          name="Home" 
          component={DrawerNavigator} 
          options={{ title: 'Task List' }} // Define o título da tela principal
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
