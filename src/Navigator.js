import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskList from './screens/TaskList';
import Auth from './screens/Auth';

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
          component={TaskList} 
          options={{ title: 'Task List' }} // Define o título da tela principal
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
