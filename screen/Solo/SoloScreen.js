import React from 'react';
import { View, Text } from 'react-native';

import PreviousResultScreen from '../PreviousResult/PrveiousResultScreen';

import FONT from '../../common/constants/FONT';
import COLORS from '../../common/constants/COLORS';

const SoloScreen = (props) => {
  return (
    <View style={styles.screen}>
      <PreviousResultScreen />
      <Text style={styles.text}>SoloScreen</Text>
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
    fontSize: FONT.X_LARGE,
    color: COLORS.DEEP_RED,
    fontFamily: 'nosifer-regular',
  },
});
