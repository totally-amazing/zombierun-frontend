import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import COLORS from '../../../common/constants/COLORS';

const Timer = ({ time, hasStarted, onFinish, hasFinished }) => {
  const [seconds, setSeconds] = useState(time * 60);
  const timer = useRef();

  useEffect(() => {
    const setTimer = () => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
        return;
      }

      if (seconds === 0) {
        const minutes = Math.floor(seconds / 60);

        onFinish(minutes);
        clearInterval(timer.current);
      }
    };

    if (hasStarted) {
      timer.current = setInterval(setTimer, 1000);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [seconds, hasStarted]);

  useEffect(() => {
    if (hasFinished) {
      const minutes = Math.floor(seconds / 60);

      onFinish(minutes);
      clearInterval(timer.current);
    }
  }, [hasFinished]);

  return (
    <View>
      <Text style={styles.timer}>
        {Math.floor(seconds / 60)}:
        {seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
      </Text>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  timer: {
    color: COLORS.WHITE,
  },
});

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  hasStarted: PropTypes.bool.isRequired,
  hasFinished: PropTypes.bool.isRequired,
  onFinish: PropTypes.func.isRequired,
};
