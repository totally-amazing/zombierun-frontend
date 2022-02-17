import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import FONT from '../../../common/constants/FONT';
import COLORS from '../../../common/constants/COLORS';
import { DIFFICULTY } from '../../../common/constants/MESSAGE';

const Difficulty = ({ speed }) => {
  const [diffcutlyTitle, setDiffcultyTitle] = useState('');
  const [message, setMessage] = useState('');
  const convertedSpeed = Number(speed);

  useEffect(() => {
    if (convertedSpeed === 0 || Number.isNaN(convertedSpeed)) {
      setDiffcultyTitle('');
      setMessage('');
    }

    if (convertedSpeed > 0 && convertedSpeed <= 5) {
      setDiffcultyTitle('Easy');
      setMessage(DIFFICULTY.EASY);
    }

    if (convertedSpeed > 5 && convertedSpeed < 10) {
      setDiffcultyTitle('Normal');
      setMessage(DIFFICULTY.NORMAL);
    }

    if (convertedSpeed >= 10) {
      setDiffcultyTitle('Hard');
      setMessage(DIFFICULTY.HARD);
    }
  }, [convertedSpeed]);

  return (
    <View>
      <Text style={styles.title}>{diffcutlyTitle}</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default Difficulty;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  title: {
    fontSize: FONT.MEDIUM,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginVertical: 15,
  },
  text: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: FONT.MEDIUM,
  },
});

Difficulty.propTypes = {
  speed: PropTypes.string,
};

Difficulty.defaultProps = {
  speed: null,
};
