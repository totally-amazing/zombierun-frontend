import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';
import { BASE_URL } from '@env';
import PropTypes from 'prop-types';
import * as Location from 'expo-location';

import COLORS from '../../common/constants/COLORS';
import Pause from './components/Pause';
import AudioController from './audioController';
import GameView from './components/GameView';
import Header from './components/Header';
import Socket from '../../network/socket';
import { getGameResult } from '../../store/gameSlice';

const RunningScreen = ({ route, navigation }) => {
  const { speed, time } = route.params.gameSetting;
  const conversionRate = 0.277778;
  const socket = new Socket(BASE_URL);
  const dispatch = useDispatch();
  const [userDistance, setUserDistance] = useState(0);
  const [opponentDistance, setOpponentDistance] = useState(-500);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [hasGameFinished, setHasGameFinished] = useState(false);
  const [hasOptionClicked, setHasOptionClicked] = useState(false);
  const [userCount, setUserCount] = useState(0);

  const { id } = useSelector((state) => state.user);
  const { mode, role } = useSelector((state) => state.game);
  const { allPlayersId } = useSelector((state) => state.room);
  const canHearingSoundEffect = useSelector(
    (state) => state.ui.canHearingEffect,
  );
  const canHearingBackgroundMusic = useSelector(
    (state) => state.ui.canHearingBGMusic,
  );

  const locationHistory = useRef([]);
  const survivalTime = useRef(time);
  const countDown = useRef();
  const intervalId = useRef();
  const tracker = useRef();
  const { current: audioController } = useRef(new AudioController());

  const speedMeterPerSecond = Math.ceil(conversionRate * speed);
  const distanceGap = Math.ceil(userDistance - opponentDistance);

  survivalTime.current = time;

  const startRunning = async () => {
    setHasGameStarted(true);

    if (canHearingSoundEffect) {
      audioController.playSoundEffect();
    }

    if (canHearingBackgroundMusic) {
      audioController.playBackgroundMusic();
    }

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
          const reducedHumanDistance = preivousDistance + coords.speed;

          return reducedHumanDistance;
        });
        locationHistory.current = [
          ...locationHistory.current,
          {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
        ];
      },
    );

    tracker.current = userLocation;
  };

  const getCurrentLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync();

    locationHistory.current = [
      ...locationHistory.current,
      {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
    ];
  };

  const pauseGameStatus = () => {
    clearInterval(intervalId.current);
    tracker.current?.remove();
    intervalId.current = null;
    audioController.stopAllSound();
    setHasGameStarted(false);
  };

  const handlePressStartButton = () => {
    startRunning();
    setHasGameStarted(true);
  };

  const handlePressStopButton = () => {
    pauseGameStatus();
    setHasOptionClicked(false);
  };

  const handlePressOptionButton = () => {
    pauseGameStatus();
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

      return;
    }

    if (passedTime === 0) {
      if (role === 'human') {
        setIsWinner(true);
        setHasGameFinished(true);
      }
    } else {
      survivalTime.current -= passedTime;
      setHasGameFinished(true);
    }
  };

  useEffect(() => {
    const initStartUp = () => {
      if (mode === 'survival') {
        setUserCount(allPlayersId.length);
      }

      getCurrentLocation();

      audioController.loadAudio();
      countDown.current = setTimeout(startRunning, 5000);
    };

    initStartUp();

    return () => {
      clearTimeout(countDown.current);
      tracker.current?.remove();
      audioController.resetAudio();
    };
  }, []);

  useEffect(() => {
    const startOpponentRunning = () => {
      if (mode === 'oneOnOne') {
        socket.on('game/opponentSpeed', (opponentSpeed) => {
          setOpponentDistance((previousDistance) => {
            const reducedOpponentDistance = previousDistance + opponentSpeed;

            return reducedOpponentDistance;
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
        intervalId.current = setInterval(() => {
          setOpponentDistance((previousDistance) => {
            const reducedOpponentDistance =
              previousDistance + speedMeterPerSecond;
            return reducedOpponentDistance;
          });
        }, 1000);
      }
    };

    if (hasGameStarted) {
      startOpponentRunning();
    }

    return () => {
      clearInterval(intervalId.current);
    };
  }, [hasGameStarted]);

  useEffect(() => {
    const finishGame = () => {
      if (mode === 'oneOnOne' || mode === 'survival') {
        socket.emit('user/leave');
      }

      const kilometerDistance = Math.ceil(userDistance) / 1000;
      const kilomterPerHour = kilometerDistance / (survivalTime.current / 60);

      clearInterval(intervalId.current);
      tracker.current?.remove();
      audioController.resetAudio();
      navigation.navigate('Result');

      dispatch(
        getGameResult({
          userId: id,
          locationHistory: locationHistory.current,
          isWinner,
          distance: kilometerDistance,
          time: survivalTime.current,
          speed: kilomterPerHour.toFixed(1),
          mode,
          role,
        }),
      );
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
        socket={socket}
        userCounts={userCount}
        hasStarted={hasGameStarted}
        hasFinished={hasGameFinished}
        onFinish={handleFinishGame}
        onPress={handlePressOptionButton}
      />
      <GameView
        id={id}
        role={role}
        mode={mode}
        socket={socket}
        hasStarted={hasGameStarted}
        audioController={audioController}
        distanceGap={distanceGap}
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
