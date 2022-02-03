import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../../common/constants/COLORS';
import FONT_SIZE from '../../../common/constants/FONT_SIZE';

const SoloScreen = (props) => {
  return (
    <View>
      <Text>SoloScreen</Text>
    </View>
  );
};

export default SoloScreen;

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
