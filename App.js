import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';

import AppNavigator from './navigation/AppNavigator';
import store from './store';
import HttpClient from './service/http';
import AuthService from './service/auth';
import ErrorMessage from './common/components/ErrorMessage';

const httpClient = new HttpClient();
const authService = new AuthService(httpClient);

const fetchFonts = () => {
  return Font.loadAsync({
    'nosifer-regular': require('./assets/fonts/Nosifer-Regular.ttf'),
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={ErrorMessage}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator authService={authService} />
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;
