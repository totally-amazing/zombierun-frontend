import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, View } from 'react-native';

import FONT from '../constants/FONT';
import COLORS from '../constants/COLORS';

const TinyTitle = ({ title, children }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default TinyTitle;

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

TinyTitle.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
