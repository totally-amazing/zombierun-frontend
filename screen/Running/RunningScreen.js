import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import * as Location from 'expo-location';

import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import ValueWithUnit from '../../common/components/ValueWithUnit';
import Timer from './components/Timer';
import Pause from './components/Pause';
import AudioController from './audioController';
import GameView from './components/GameView';

const RunningScreen = ({ route, navigation }) => {
  const { speed, time } = route.params.gameSetting;
  const conversionRate = 0.277778;
  const [userDistance, setUserDistance] = useState(0);
  const [zombieDistance, setZombieDistance] = useState(-500);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [hasGameFinished, setHasGameFinished] = useState(false);
  const [hasOptionClicked, setHasOptionClicked] = useState(false);

  const canHearingSoundEffect = useSelector(
    (state) => state.ui.canHearingEffect,
  );
  const canHearingBackgroundusic = useSelector(
    (state) => state.ui.canHearingBGMusic,
  );

  const locationHistory = useRef([]);
  const survivalTime = useRef(time);
  const countDown = useRef();
  const intervalId = useRef();
  const tracker = useRef();
  const { current: audioController } = useRef(new AudioController());

  const speedMeterPerSecond = Math.ceil(conversionRate * speed);
  const distanceGap = Math.ceil(userDistance - zombieDistance);

  survivalTime.current = time;

  const startRunning = async () => {
    setHasGameStarted(true);

    if (canHearingSoundEffect) {
      audioController.playSoundEffect();
    }

    if (canHearingBackgroundusic) {
      audioController.playBackgroundMusic();
    }

    const userLocation = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
      },
      (location) => {
        const { coords } = location;

        setUserDistance((preivousDistance) => {
          const reducedHumanDistance = preivousDistance + coords.speed;

          return reducedHumanDistance;
        });
        locationHistory.current = [
          ...locationHistory.current,
          {
            lat: coords.latitude,
            lon: coords.longitude,
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
        lat: coords.latitude,
        lon: coords.longitude,
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

  const handlePressStopButton = () => {
    pauseGameStatus();
    setHasOptionClicked(false);
  };

  const handlePressStartButton = () => {
    startRunning();
    setHasGameStarted(true);
  };

  const handlePressOptionButton = () => {
    pauseGameStatus();
    setHasOptionClicked(true);
  };

  const handleFinishDistanceResult = () => {
    setHasGameFinished(true);
  };

  const handleFinishGame = (passedTime) => {
    if (passedTime === 0) {
      setIsWinner(true);
    } else {
      survivalTime.current -= passedTime;
    }

    setHasGameFinished(true);
  };

  const headerOptionButton = useCallback(() => {
    return (
      <FontAwesome
        name="gear"
        style={styles.option}
        onPress={handlePressOptionButton}
      />
    );
  }, []);

  useEffect(() => {
    const setNavigatorOptions = () => {
      navigation.setOptions({
        headerTitle: '',
        headerLeft: () => {},
        headerRight: headerOptionButton,
      });
    };

    setNavigatorOptions();
  }, [navigation]);

  useEffect(() => {
    const initStartUp = () => {
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
    const startZombieChasing = () => {
      intervalId.current = setInterval(() => {
        setZombieDistance((previousDistance) => {
          const reducedZombieDistance = previousDistance + speedMeterPerSecond;

          return reducedZombieDistance;
        });
      }, 1000);
    };

    if (hasGameStarted) {
      startZombieChasing();
    }

    return () => {
      clearInterval(intervalId.current);
    };
  }, [hasGameStarted]);

  useEffect(() => {
    const finishGame = () => {
      clearInterval(intervalId.current);
      tracker.current?.remove();
      audioController.resetAudio();
      navigation.navigate('Result', {
        locationHistory: locationHistory.current,
        isWinner,
        distance: Math.ceil(userDistance),
        time: survivalTime.current,
        speed,
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
          onPress={handlePressStartButton}
          hasOptionClicked={hasOptionClicked}
          countDownStatus={countDown.current}
        />
      )}
      <View style={styles.header}>
        <Timer
          time={time}
          hasStarted={hasGameStarted}
          hasFinished={hasGameFinished}
          onFinish={handleFinishGame}
        />
        <ValueWithUnit value={String(speed)} unit="km/h" />
      </View>
      <GameView
        hasStarted={hasGameStarted}
        audioController={audioController}
        distanceGap={distanceGap}
        onFinish={handleFinishDistanceResult}
      />
      {hasGameStarted && (
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
  header: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },
  option: {
    fontSize: FONT.MEDIUM,
    color: COLORS.WHITE,
    marginHorizontal: 30,
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
