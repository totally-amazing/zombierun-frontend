import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import COLORS from '../../../common/constants/COLORS';
import FONT from '../../../common/constants/FONT';

const RoomTitle = ({ value, onChangeText }) => {
  return (
    <View>
      <TextInput
        placeholder="방제를 입력하세요"
        placeholderTextColor={COLORS.WHITE}
        style={styles.text}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default RoomTitle;

const styles = StyleSheet.create({
  text: {
    fontSize: FONT.SMALL,
    color: COLORS.WHITE,
    paddingVertical: 1,
    borderBottomColor: COLORS.WHITE,
    borderBottomWidth: 3,
  },
});

RoomTitle.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
};
