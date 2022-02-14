import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import MainNavigator from './MainNavigator';
import AuthScreen from '../screen/Auth/AuthScreen';

const AppNavigator = () => {
  const { id } = useSelector((state) => state.user);

  return (
    <NavigationContainer>
      {/* {!id && <AuthScreen />}
      {id && <MainNavigator />} */}
      <MainNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
