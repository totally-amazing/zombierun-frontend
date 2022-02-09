import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

// eslint-disable-next-line react/prop-types
const Timer = ({ time, start }) => {
  const [minutes, setMinutes] = useState(time);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const setTimeWatch = () => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
        return;
      }

      if (seconds === 0 && minutes === 0) {
        clearInterval(setTimeWatch);
        return;
      }

      setMinutes((prevMinutes) => prevMinutes - 1);
      setSeconds(59);
    };

    let startTimer;

    if (!start) {
      startTimer = setTimeout(() => {
        setTimeWatch();
      }, 5000);
    }

    return () => {
      clearTimeout(startTimer);
      clearInterval(setTimeWatch);
    };
  }, [minutes, seconds, start]);

  return (
    <View>
      <Text>
        {minutes}: {seconds < 10 ? `0${seconds}` : seconds}
      </Text>
    </View>
  );
};

export default Timer;
