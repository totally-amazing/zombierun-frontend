import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import COLORS from '../../../common/constants/COLORS';
import FONT from '../../../common/constants/FONT';

const WindowWithText = ({ onPress, message }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.title}>{message}</Text>
    </Pressable>
  );
};

export default WindowWithText;

const styles = StyleSheet.create({
  title: {
    fontSize: FONT.LARGE,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});

WindowWithText.propTypes = {
  onPress: PropTypes.func.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};
