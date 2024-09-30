/**
 * @format
 */
import 'react-native-gesture-handler';  // Import necessário para gestos
import { AppRegistry } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';  // Importação do GestureHandlerRootView
import Navigator from './src/Navigator';  // Certifique-se de importar seu componente Navigator
import { name as appName } from './app.json';

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <Navigator />  
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => App); // Registra o App que agora engloba o Navigator
