import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, View } from 'react-native';

import FONT from '../constants/FONT';
import COLORS from '../constants/COLORS';

const ValueWithUnit = ({ value, unit }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.unit}>{unit}</Text>
    </View>
  );
};

export default ValueWithUnit;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  value: {
    fontSize: FONT.LARGE,
    color: COLORS.WHITE,
  },
  unit: {
    paddingTop: 20,
    fontSize: FONT.X_SMALL,
    color: COLORS.WHITE,
  },
});

ValueWithUnit.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  unit: PropTypes.string,
};

ValueWithUnit.defaultProps = {
  value: '',
  unit: '',
};
