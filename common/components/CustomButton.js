import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import COLORS from '../constants/COLORS';
import FONT_SIZE from '../constants/FONT';

const BUTTON_WIDTH = 300;
const BUTTON_HEIGHT = 60;
const BUTTON_ROUND = 24;

const CustomButton = ({ message, disabled, onPress, style }) => {
  const handlePressButton = () => {
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={handlePressButton}
    >
      <Text style={{ ...styles.loginButton, ...style }}>{message}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  loginButton: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_ROUND,
    lineHeight: BUTTON_HEIGHT,
    fontSize: FONT_SIZE.SMALL,
    textAlign: 'center',
    color: COLORS.WHITE,
    backgroundColor: COLORS.RED,
  },
});

CustomButton.propTypes = {
  message: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
};

CustomButton.defaultProps = {
  disabled: true,
  style: {},
};
