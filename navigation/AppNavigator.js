import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import MainNavigator from './MainNavigator';
import AuthScreen from '../screen/Auth/AuthScreen';
import SoloScreen from '../screen/Solo/SoloScreen';

const AppNavigator = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <NavigationContainer>
      {!isAuth && <AuthScreen />}
      {isAuth && <MainNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
