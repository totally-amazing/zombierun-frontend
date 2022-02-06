import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';

import AppNavigator from './navigation/AppNavigator';
import store from './store';
import showErrorMessage from './common/components/ErrorMessage';

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
        onError={showErrorMessage}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;
