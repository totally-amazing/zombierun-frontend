import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import COLORS from '../../../common/constants/COLORS';

const LineWithText = ({ text }) => {
  return (
    <View>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default LineWithText;

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: 300,
    backgroundColor: COLORS.WHITE,
  },
  text: {
    width: 100,
    top: -10,
    left: 100,
    textAlign: 'center',
    color: COLORS.WHITE,
    backgroundColor: COLORS.BLACK,
  },
});

LineWithText.propTypes = {
  text: PropTypes.string.isRequired,
};
