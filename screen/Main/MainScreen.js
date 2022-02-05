import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FONT from '../../common/constants/FONT';
import COLORS from '../../common/constants/COLORS';
import PreviousResultScreen from '../PreviousResult/PrveiousResultScreen';

const MainScreen = (props) => {
  return (
    <View style={styles.screen}>
      <PreviousResultScreen />
      <Text style={styles.text}>MainScreen</Text>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: FONT.X_LARGE,
    color: COLORS.DEEP_RED,
    fontFamily: 'nosifer-regular',
  },
});
