import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../common/constants/COLORS';

// eslint-disable-next-line react/prop-types
const Timer = ({ time, start, onTimeout }) => {
  const [minutes, setMinutes] = useState(time);
  const [seconds, setSeconds] = useState(0);
  const [timeWatchId, setTimeWatchId] = useState();
  let timeWatch;

  useEffect(() => {
    const setTimeWatch = () => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
        return;
      }

      if (seconds === 0 && minutes === 0) {
        onTimeout();
        clearInterval(timeWatchId);
        return;
      }

      setMinutes((prevMinutes) => prevMinutes - 1);
      setSeconds(59);
    };

    if (start) {
      timeWatch = setInterval(setTimeWatch, 1000);
      setTimeWatchId(timeWatch);
    }

    return () => {
      clearInterval(timeWatch);
    };
  }, [minutes, seconds, start]);

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
