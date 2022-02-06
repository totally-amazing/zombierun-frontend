import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import FONT from '../constants/FONT';
import COLORS from '../constants/COLORS';

const UnitText = ({ value, unit }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.unit}>{unit}</Text>
    </View>
  );
};

export default UnitText;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  value: {
    fontSize: FONT.X_LARGE,
    color: COLORS.WHITE,
  },
  unit: {
    paddingTop: 20,
    fontSize: FONT.X_SMALL,
    color: COLORS.WHITE,
  },
});

UnitText.propTypes = {
  value: PropTypes.string,
  unit: PropTypes.string,
};

UnitText.defaultProps = {
  value: '',
  unit: '',
};
