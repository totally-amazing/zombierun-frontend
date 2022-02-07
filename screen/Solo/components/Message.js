import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import COLORS from '../../../common/constants/COLORS';
import FONT from '../../../common/constants/FONT';

const Message = ({ speed }) => {
  const [message, setMessage] = useState('');

  const EASY_MESSAGE = '느린보 좀비를 만났습니다';
  const NORMAL_MESSAGE = '평범한 좀비를 만났습니다';
  const HARD_MESSAGE = '이 좀비는 좀 다릅니다.!!!';

  useEffect(() => {
    if (speed === 0 || Number.isNaN(speed)) {
      setMessage('');
    }

    if (speed > 0 && speed <= 5) {
      setMessage(EASY_MESSAGE);
    }

    if (speed > 5 && speed < 10) {
      setMessage(NORMAL_MESSAGE);
    }

    if (speed >= 10) {
      setMessage(HARD_MESSAGE);
    }
  }, [speed]);

  return (
    <View>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: FONT.MEDIUM,
  },
});

Message.propTypes = {
  speed: PropTypes.number,
};

Message.defaultProps = {
  speed: null,
};
