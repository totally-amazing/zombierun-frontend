import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import FONT from '../../../common/constants/FONT';
import COLORS from '../../../common/constants/COLORS';

const SurvivalCount = ({ userCounts, hasStarted, hasFinished, onFinish }) => {
  const seconds = useRef(0);
  const stopWatchId = useRef();

  useEffect(() => {
    const setStopWatch = () => {
      seconds.current += 1;
    };

    if (hasStarted) {
      stopWatchId.current = setInterval(setStopWatch, 1000);
    }

    return () => {
      clearInterval(stopWatchId.current);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (userCounts === 1 || hasFinished) {
      const minutes = Math.floor(seconds.current / 60);

      onFinish(minutes, userCounts);
      clearInterval(stopWatchId.current);
    }
  }, [userCounts, hasFinished]);

  return (
    <View>
      <Text style={styles.userCount}>left: {userCounts}</Text>
    </View>
  );
};

export default SurvivalCount;

const styles = StyleSheet.create({
  userCount: {
    fontSize: FONT.LARGE,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});

SurvivalCount.propTypes = {
  userCounts: PropTypes.number.isRequired,
  hasStarted: PropTypes.bool.isRequired,
  hasFinished: PropTypes.bool.isRequired,
  onFinish: PropTypes.func.isRequired,
};
