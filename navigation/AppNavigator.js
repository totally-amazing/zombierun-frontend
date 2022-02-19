import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import MainNavigator from './MainNavigator';
import AuthScreen from '../screen/Auth/AuthScreen';
import { fetchUserByToken } from '../store/userSlice';

const AppNavigator = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserByToken());
  }, []);

  return (
    <NavigationContainer>
      {!id && <AuthScreen />}
      {id && <MainNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
