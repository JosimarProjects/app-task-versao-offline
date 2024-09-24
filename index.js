/**
 * @format
 */
import 'react-native-gesture-handler';  // Import necessário para gestos
import { AppRegistry } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';  // Importação do GestureHandlerRootView
import TaskList from './src/screens/TaskList';
import Auth from './src/screens/Auth';
import { name as appName } from './app.json';

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <TaskList />
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => Auth);
