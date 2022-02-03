import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from '../screen/Main/MainScreen';
import MyPageScreen from '../screen/MyPage/MyPageScreen';
import OneOnOneScreen from '../screen/Room/components/OneOnOneScreen';
import ResultScreen from '../screen/Result/ResultScreen';
import PreviousResultScreen from '../screen/PreviousResult/PrveiousResultScreen';
import RoomScreen from '../screen/Room/RoomScreen';
import RoomListScreen from '../screen/RoomList/RoomListScreen';
import RunningScreen from '../screen/Running/RunningScreen';
import SettingScreen from '../screen/Setting/SettingScreen';

const MainStackNavigator = createStackNavigator();

const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator>
      <MainStackNavigator.Screen
        name='Main'
        component={MainScreen}
      />
      <MainStackNavigator.Screen
        name='MyPage'
        component={MyPageScreen}
      />
      <MainStackNavigator.Screen
        name='OneOnOne'
        component={OneOnOneScreen}
      />
      <MainStackNavigator.Screen
        name='PreviousResult'
        component={PreviousResultScreen}
      />
      <MainStackNavigator.Screen
        name='Result'
        component={ResultScreen}
      />
      <MainStackNavigator.Screen
        name='Room'
        component={RoomScreen}
      />
      <MainStackNavigator.Screen
        name='RoomList'
        component={RoomListScreen}
      />
      <MainStackNavigator.Screen
        name="Running"
        component={RunningScreen}
      />
    </MainStackNavigator.Navigator>
  );
};

export default MainNavigator;
