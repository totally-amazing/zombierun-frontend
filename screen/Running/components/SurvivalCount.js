import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import FONT from '../../../common/constants/FONT';
import COLORS from '../../../common/constants/COLORS';
import { socket } from '../../../common/hooks/useSocket';

const SurvivalCount = ({ hasStarted, hasFinished, onFinish }) => {
  const seconds = useRef(0);
  const stopWatchId = useRef();
  const numberOfPlayers = useSelector((state) => state.player.allIds).length;

  const [userCount, setUserCount] = useState(numberOfPlayers);

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
    if (userCount === 1 || hasFinished) {
      const minutes = Math.ceil(seconds.current / 60);
      onFinish(minutes, userCount);
      clearInterval(stopWatchId.current);
    }
  }, [userCount, hasFinished]);

  useEffect(() => {
    const offGameDie = socket.on('game/die', () => {
      setUserCount((prev) => prev - 1);
    });

    return () => {
      offGameDie();
    };
  }, []);

  return (
    <View>
      <Text style={styles.userCount}>left: {userCount}</Text>
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
  hasStarted: PropTypes.bool.isRequired,
  hasFinished: PropTypes.bool.isRequired,
  onFinish: PropTypes.func.isRequired,
};
