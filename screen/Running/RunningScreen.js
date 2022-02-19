import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import * as Location from 'expo-location';

import {
  emitFinishGame,
  emitUserSpeed,
  socket,
} from '../../common/hooks/useSocket';
import Pause from './components/Pause';
import AudioController from './controllers/audioController';
import GameController from './controllers/gameController';
import GameView from './components/GameView';
import Header from './components/Header';
import COLORS from '../../common/constants/COLORS';
import { createGameResult, updateGameRecord } from '../../store/gameSlice';

const RunningScreen = ({ navigation }) => {
  const { speed, time } = useSelector((state) => state.game);
  const conversionRate = 0.277778;
  const dispatch = useDispatch();

  const { role, mode } = useSelector((state) => state.game);
  const canHearingSoundEffect = useSelector(
    (state) => state.ui.canHearingEffect,
  );
  const canHearingBackgroundMusic = useSelector(
    (state) => state.ui.canHearingBGMusic,
  );

  const [userDistance, setUserDistance] = useState(0);
  const [opponentDistance, setOpponentDistance] = useState(
    role === 'zombie' ? 200 : -200,
  );
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [hasGameFinished, setHasGameFinished] = useState(false);
  const [hasOptionClicked, setHasOptionClicked] = useState(false);

  const survivalTime = useRef(time);
  const countDown = useRef();
  const intervalId = useRef();
  const tracker = useRef();
  const locationHistory = useRef([]);

  const { current: audioController } = useRef(new AudioController());
  const { current: gameController } = useRef(
    new GameController(
      intervalId.current,
      countDown.current,
      tracker.current,
      locationHistory.current,
      audioController,
    ),
  );

  const speedMeterPerSecond = Math.ceil(conversionRate * speed);
  const calculateDistance = () => {
    if (role === 'human') {
      return Math.ceil(userDistance - opponentDistance);
    }

    return Math.ceil(opponentDistance - userDistance);
  };

  const startRunning = async () => {
    setHasGameStarted(true);

    gameController.controlGameSound(
      canHearingSoundEffect,
      canHearingBackgroundMusic,
    );

    const userLocation = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
      },
      (location) => {
        const { coords } = location;

        if (mode === 'oneOnOne') {
          emitUserSpeed(coords.speed);
        }

        setUserDistance((preivousDistance) => {
          const totalDistance = preivousDistance + coords.speed;

          return totalDistance;
        });

        gameController.recordUserLocationHistory(coords);
      },
    );

    gameController.locationObj = userLocation;
  };

  const getCurrentLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync();

    gameController.recordUserLocationHistory(coords);
  };

  const handlePressStartButton = () => {
    startRunning();
    setHasGameStarted(true);
  };

  const handlePressStopButton = () => {
    gameController.pauseGameStatus();
    setHasGameStarted(false);
    setHasOptionClicked(false);
  };

  const handlePressOptionButton = () => {
    gameController.pauseGameStatus();
    setHasGameStarted(false);
    setHasOptionClicked(true);
  };

  const handleFinishDistanceResult = () => {
    setHasGameFinished(true);
  };

  const handleFinishGame = (remainingTime) => {
    if (remainingTime === 0 && role === 'human') {
      setIsWinner(true);
    }

    if (remainingTime && role === 'zombie') {
      setIsWinner(true);
    }

    survivalTime.current -= remainingTime;
    setHasGameFinished(true);
  };

  const handleFinishSurvival = (passedTime, survivorCount) => {
    survivalTime.current = passedTime;

    if (survivorCount === 1) {
      setIsWinner(true);
    }
  };

  useEffect(() => {
    const initStartUp = () => {
      getCurrentLocation();

      gameController.loadGameSound();
      gameController.timeoutId = setTimeout(startRunning, 5000);
    };

    initStartUp();

    return () => {
      gameController.resetGameSetup('timeout');
    };
  }, []);

  useEffect(() => {
    const startOpponentRunning = () => {
      if (mode === 'oneOnOne') {
        socket.on('game/opponentSpeed', (meterPerSecond) => {
          setOpponentDistance((previousDistance) => {
            const totalDistance = previousDistance + meterPerSecond;
            return totalDistance;
          });
        });

        return;
      }

      if (mode === 'solo' || mode === 'survival') {
        gameController.intervalId = setInterval(() => {
          setOpponentDistance((previousDistance) => {
            const totalDistance = previousDistance + speedMeterPerSecond;
            return totalDistance;
          });
        }, 1000);
      }
    };

    if (hasGameStarted) {
      startOpponentRunning();
    }

    return () => {
      clearInterval(gameController.intervalId);
    };
  }, [hasGameStarted]);

  const gameId = useSelector((state) => state.game.id);
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    const finishGame = () => {
      const kilometerDistance = Math.ceil(userDistance) / 1000;
      const kilometerPerHour = kilometerDistance / (survivalTime.current / 60);

      const result = {
        userId,
        locationHistory: gameController.locationRecord,
        isWinner,
        mode,
        distance: kilometerDistance.toFixed(1),
        time: survivalTime.current,
        speed: kilometerPerHour.toFixed(1),
        role,
      };

      if (mode === 'oneOnOne' || mode === 'survival') {
        emitFinishGame();
        dispatch(updateGameRecord({ ...result, gameId }));
      } else {
        dispatch(createGameResult({ ...result, mode }));
      }

      gameController.resetGameSetup('timer');

      navigation.reset({
        index: 0,
        routes: [{ name: 'Result' }],
      });
    };

    if (isWinner || hasGameFinished) {
      finishGame();
    }
  }, [isWinner, hasGameFinished]);

  return (
    <View style={styles.screen}>
      {!hasGameStarted && (
        <Pause
          role={role}
          onPress={handlePressStartButton}
          hasOptionClicked={hasOptionClicked}
          countDownStatus={gameController.timeoutId}
        />
      )}
      <Header
        navigation={navigation}
        speed={speed}
        time={time}
        mode={mode}
        hasStarted={hasGameStarted}
        hasFinished={hasGameFinished}
        onFinish={handleFinishGame}
        onFinishSurvival={handleFinishSurvival}
        onPress={handlePressOptionButton}
      />
      <GameView
        role={role}
        mode={mode}
        distanceGap={calculateDistance()}
        hasStarted={hasGameStarted}
        gameController={gameController}
        onFinish={handleFinishDistanceResult}
      />
      {hasGameStarted && mode === 'solo' && (
        <FontAwesome5
          name="pause-circle"
          style={styles.stopButton}
          onPress={handlePressStopButton}
        />
      )}
    </View>
  );
};

export default RunningScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
  },
  stopButton: {
    fontSize: 50,
    color: COLORS.WHITE,
  },
});

RunningScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      gameSetting: PropTypes.shape({
        speed: PropTypes.number.isRequired,
        time: PropTypes.number.isRequired,
      }),
    }),
  }).isRequired,
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};
