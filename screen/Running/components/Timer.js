import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import COLORS from '../../../common/constants/COLORS';

const Timer = ({ time, hasStarted, onFinish, hasFinished }) => {
  const [minutes, setMinutes] = useState(time);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState();
  let timer;

  useEffect(() => {
    const setTimer = () => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
        return;
      }

      if (seconds === 0 && minutes === 0) {
        onFinish(minutes);
        clearInterval(timerId);
        return;
      }

      setMinutes((prevMinutes) => prevMinutes - 1);
      setSeconds(59);
    };

    if (hasStarted) {
      timer = setInterval(setTimer, 1000);
      setTimerId(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [minutes, seconds, hasStarted]);

  useEffect(() => {
    if (hasFinished) {
      onFinish(minutes);
      clearInterval(timerId);
    }
  }, [hasFinished]);

  return (
    <View>
      <Text style={styles.timer}>
        {minutes}: {seconds < 10 ? `0${seconds}` : seconds}
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
