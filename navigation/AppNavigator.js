import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import MainNavigator from './MainNavigator';
import AuthScreen from '../screen/Auth/AuthScreen';

const AppNavigator = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
