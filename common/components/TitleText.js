import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import FONT from '../constants/FONT';
import COLORS from '../constants/COLORS';

const TitleText = ({ title, children }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default TitleText;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  title: {
    fontSize: FONT.X_SMALL,
    color: COLORS.WHITE,
  },
  content: {
    flexDirection: 'row',
    color: FONT.WHITE,
  },
});

TitleText.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
