import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen, {
  screenOption as mainHeaderOption,
} from '../screen/Main/MainScreen';
import MyPageScreen from '../screen/MyPage/MyPageScreen';
import OneOnOneScreen from '../screen/Room/components/OneOnOneScreen';
import ResultScreen from '../screen/Result/ResultScreen';
import PreviousResultScreen from '../screen/PreviousResult/PrveiousResultScreen';
import RoomScreen from '../screen/Room/RoomScreen';
import RoomListScreen from '../screen/RoomList/RoomListScreen';
import RunningScreen from '../screen/Running/RunningScreen';
import SoloScreen, {
  screenOption as soloHeaderOption,
} from '../screen/Solo/SoloScreen';
import SettingScreen from '../screen/Setting/SettingScreen';
import COLORS from '../common/constants/COLORS';
import RoomMakerScreen from '../screen/RoomMaker/RoomMakerScreen';

const MainStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: COLORS.BLACK,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTintColor: COLORS.DEEP_RED,
};

const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <MainStackNavigator.Screen
        name="Main"
        component={MainScreen}
        options={mainHeaderOption}
      />
      <MainStackNavigator.Screen name="MyPage" component={MyPageScreen} />
      <MainStackNavigator.Screen
        name="Solo"
        component={SoloScreen}
        options={soloHeaderOption}
      />
      <MainStackNavigator.Screen name="OneOnOne" component={OneOnOneScreen} />
      <MainStackNavigator.Screen
        name="PreviousResult"
        component={PreviousResultScreen}
      />
      <MainStackNavigator.Screen name="Result" component={ResultScreen} />
      <MainStackNavigator.Screen name="Room" component={RoomScreen} />
      <MainStackNavigator.Screen name="RoomMaker" component={RoomMakerScreen} />
      <MainStackNavigator.Screen name="RoomList" component={RoomListScreen} />
      <MainStackNavigator.Screen name="Running" component={RunningScreen} />
    </MainStackNavigator.Navigator>
  );
};

export default MainNavigator;
