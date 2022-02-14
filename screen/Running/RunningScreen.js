import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';
import { BASE_URL } from '@env';
import PropTypes from 'prop-types';
import * as Location from 'expo-location';

import Pause from './components/Pause';
import AudioController from './controllers/audioController';
import GameController from './controllers/gameController';
import GameView from './components/GameView';
import Header from './components/Header';
import Socket from '../../network/socket';
import COLORS from '../../common/constants/COLORS';
import { getGameResult } from '../../store/gameSlice';

const RunningScreen = ({ route, navigation }) => {
  const { speed, time } = route.params.gameSetting;
  const conversionRate = 0.277778;
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.user);
  const { allPlayersId } = useSelector((state) => state.room);
  const { role, mode } = useSelector((state) => state.game);
  const canHearingSoundEffect = useSelector(
    (state) => state.ui.canHearingEffect,
  );
  const canHearingBackgroundMusic = useSelector(
    (state) => state.ui.canHearingBGMusic,
  );

  const [userDistance, setUserDistance] = useState(0);
  const [opponentDistance, setOpponentDistance] = useState(-500);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [hasGameFinished, setHasGameFinished] = useState(false);
  const [hasOptionClicked, setHasOptionClicked] = useState(false);
  const [userCount, setUserCount] = useState(allPlayersId.length);

  const survivalTime = useRef(time);
  const countDown = useRef();
  const intervalId = useRef();
  const tracker = useRef();
  const locationHistory = useRef([]);

  const { current: socket } = useRef(new Socket(BASE_URL));
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
  const distanceGap = Math.ceil(userDistance - opponentDistance);

  survivalTime.current = time;

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
          socket.emit('game/userSpeed', coords.speed);
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

  const handleFinishGame = (passedTime, survivorCount) => {
    if (mode === 'survival') {
      survivalTime.current = passedTime;

      if (survivorCount === 1) {
        setIsWinner(true);
      }
    }

    if (passedTime === 0) {
      if (role === 'human') {
        setIsWinner(true);
      }
    } else {
      survivalTime.current -= passedTime;
    }

    setHasGameFinished(true);
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

      if (mode === 'survival') {
        socket.on('game/die', () => {
          setUserCount((prev) => prev - 1);
        });
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

  useEffect(() => {
    const finishGame = () => {
      if (mode === 'oneOnOne' || mode === 'survival') {
        socket.emit('user/leave');
      }

      const kilometerDistance = Math.ceil(userDistance) / 1000;
      const kilometerPerHour = kilometerDistance / (survivalTime.current / 60);

      gameController.resetGameSetup('timer');
      dispatch(
        getGameResult({
          userId: id,
          locationHistory: gameController.locationRecord,
          isWinner,
          distance: kilometerDistance,
          time: survivalTime.current,
          speed: kilometerPerHour.toFixed(1),
          mode,
          role,
        }),
      );

      navigation.navigate('Result');
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
          countDownStatus={countDown.current}
        />
      )}
      <Header
        navigation={navigation}
        speed={speed}
        time={time}
        mode={mode}
        userCounts={userCount}
        hasStarted={hasGameStarted}
        hasFinished={hasGameFinished}
        onFinish={handleFinishGame}
        onPress={handlePressOptionButton}
      />
      <GameView
        role={role}
        mode={mode}
        socket={socket}
        distanceGap={distanceGap}
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
