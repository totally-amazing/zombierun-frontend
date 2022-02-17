import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import FONT from '../../../common/constants/FONT';
import COLORS from '../../../common/constants/COLORS';

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
      setMessage('느림보 좀비를 만났습니다');
    }

    if (convertedSpeed > 5 && convertedSpeed < 10) {
      setDiffcultyTitle('Normal');
      setMessage('평범한 좀비를 만났습니다');
    }

    if (convertedSpeed >= 10) {
      setDiffcultyTitle('Hard');
      setMessage('이 좀비는 좀 다릅니다!!');
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
