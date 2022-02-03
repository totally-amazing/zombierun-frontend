import React from 'react';
import { View, Text } from 'react-native';

import FONT_SIZE from '../../common/constants/FONT_SIZE';
import COLORS from '../../common/constants/COLORS';

const SoloScreen = (props) => {
  return (
    <View style={styles.screen}>
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
    fontSize: FONT_SIZE.X_LARGE,
    color: COLORS.DEEP_RED,
    fontFamily: 'nosifer-regular',
  },
});
