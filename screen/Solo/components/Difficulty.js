import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import FONT from '../../../common/constants/FONT';
import Message from './Message';
import COLORS from '../../../common/constants/COLORS';

const Difficulty = ({ speed }) => {
  const [diffcutlyTitle, setDiffcultyTitle] = useState('');
  const convertSpeed = Number(speed);

  useEffect(() => {
    if (convertSpeed === 0 || Number.isNaN(convertSpeed)) {
      setDiffcultyTitle('');
    }

    if (convertSpeed > 0 && convertSpeed <= 5) {
      setDiffcultyTitle('Easy');
    }

    if (convertSpeed > 5 && convertSpeed < 10) {
      setDiffcultyTitle('Normal');
    }

    if (convertSpeed >= 10) {
      setDiffcultyTitle('Hard');
    }
  }, [convertSpeed]);

  return (
    <View style={styles.textContainer}>
      <Text style={styles.title}>{diffcutlyTitle}</Text>
      <Message speed={convertSpeed} />
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
});

Difficulty.propTypes = {
  speed: PropTypes.string,
};

Difficulty.defaultProps = {
  speed: null,
};
