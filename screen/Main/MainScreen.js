import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FONT_SIZE from '../../common/constants/FONT_SIZE';
import COLORS from '../../common/constants/COLORS';

const MainScreen = (props) => {
  return (
    <View style={styles.screen}>
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
    fontSize: FONT_SIZE.X_LARGE,
    color: COLORS.DEEP_RED,
    fontFamily: 'nosifer-regular',
  },
});
