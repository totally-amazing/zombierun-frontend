import { React } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import COLORS from '../../../common/constants/COLORS';

const ExitButton = ({ onPress, text }) => {
  return (
    <Pressable style={styles.exit} onPress={onPress}>
      <AntDesign name="arrowleft" size={20} color={COLORS.DEEP_RED} />
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default ExitButton;

const styles = StyleSheet.create({
  exit: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 32,
    marginLeft: 32,
  },
  text: {
    color: COLORS.DEEP_RED,
  },
});

ExitButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
