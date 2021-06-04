//permite usar no app os gestos nativos
import 'react-native-gesture-handler'

import React from 'react';

//fica em volta de todas as rotas do projeto
import { NavigationContainer } from '@react-navigation/native'

//rotas
import Routes from './src/routes'

const App = () => {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}

export default App;