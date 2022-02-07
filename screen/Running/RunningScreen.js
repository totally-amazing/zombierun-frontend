import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet } from 'react-native';

import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import SettingScreen from '../Setting/SettingScreen';

const RunningScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <SettingScreen navigation={navigation} />
      <Text style={styles.text}>RunningScreen</Text>
    </View>
  );
};

export default RunningScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: FONT.X_LARGE,
    color: COLORS.DEEP_RED,
    fontFamily: FONT.BLOOD_FONT,
  },
});

RunningScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};
