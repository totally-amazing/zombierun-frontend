import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import * as Location from 'expo-location';

import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import UnitText from '../../common/components/UnitText';
import Timer from './components/Timer';
import Pause from './components/Pause';
import AudioController from './audioController';

const RunningScreen = ({ route, navigation }) => {
  const { speed, time } = route.params.gameSetting;
  const conversionRate = 0.277778;
  const [userDistance, setUserDistance] = useState(0);
  const [zombieSize, setZombieSize] = useState('far');
  const [zombieDistance, setZombieDistance] = useState(-500);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [hasGameFinished, setHasGameFinished] = useState(false);
  const [hasOptionClicked, setHasOptionClicked] = useState(false);

  const hasSwitchSoundEffectOption = useSelector(
    (state) => state.ui.canHearingEffect,
  );
  const hasSwitchMusicOption = useSelector(
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

    if (!hasSwitchSoundEffectOption) {
      audioController.playSoundEffect();
    }

    if (!hasSwitchMusicOption) {
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

  const handlePressStopButton = () => {
    if (hasGameStarted) {
      clearInterval(intervalId.current);
      tracker.current?.remove();
      intervalId.current = null;
      setHasGameStarted(false);
      setHasOptionClicked(false);
      audioController.stopAllSound();
    }
  };

  const handlePressStartButton = () => {
    startRunning();
    setHasGameStarted(true);
  };

  const handleFinishGame = (passedTime) => {
    if (passedTime === 0) {
      setIsWinner(true);
    } else {
      survivalTime.current -= passedTime;
    }

    setHasGameFinished(true);
  };

  const handlePressOptionButton = () => {
    clearInterval(intervalId.current);
    tracker.current?.remove();
    intervalId.current = null;
    setHasGameStarted(false);
    setHasOptionClicked(true);
    audioController.stopAllSound();
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
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => {},
      headerRight: headerOptionButton,
    });
  }, [navigation]);

  useEffect(() => {
    getCurrentLocation();

    audioController.loadAudio();

    countDown.current = setTimeout(startRunning, 5000);

    return () => {
      clearTimeout(countDown.current);
      tracker.current?.remove();
      audioController.resetAudio();
    };
  }, []);

  useEffect(() => {
    if (hasGameStarted) {
      intervalId.current = setInterval(() => {
        setZombieDistance((previousDistance) => {
          const reducedZombieDistance = previousDistance + speedMeterPerSecond;

          return reducedZombieDistance;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId.current);
    };
  }, [hasGameStarted]);

  useEffect(() => {
    if (!hasGameStarted) {
      return;
    }

    if (distanceGap >= 400) {
      setZombieSize('far');
      audioController.changeSoundEffectVolume(0.2);
    }

    if (distanceGap >= 200 && distanceGap < 400) {
      setZombieSize('middle');
      audioController.changeSoundEffectVolume(0.5);
    }

    if (distanceGap >= 100 && distanceGap < 200) {
      setZombieSize('close');
      audioController.changeSoundEffectVolume(1);
    }

    if (distanceGap <= 0) {
      setHasGameFinished(true);
    }
  }, [distanceGap, hasGameStarted]);

  useEffect(() => {
    if (isWinner || hasGameFinished) {
      clearInterval(intervalId.current);
      tracker.current?.remove();
      audioController.resetAudio();
      navigation.navigate('Result', {
        result: {
          locationHistory,
          isWinner,
          distance: Math.ceil(userDistance),
          time: survivalTime.current,
          speed,
        },
      });
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
        <UnitText value={String(speed)} unit="km/h" />
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles[zombieSize]}
          source={require('../../assets/images/zombie.gif')}
        />
      </View>
      <Text style={styles.distance}>Distance</Text>
      <Text style={styles.distanceNumber}>{distanceGap}M</Text>
      {hasGameStarted && (
        <FontAwesome5
          name="pause-circle"
          size={50}
          color={COLORS.WHITE}
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
  distance: {
    fontSize: FONT.MEDIUM,
    fontFamily: FONT.BLOOD_FONT,
    color: COLORS.WHITE,
  },
  distanceNumber: {
    fontSize: FONT.X_LARGE,
    fontFamily: FONT.BLOOD_FONT,
    color: COLORS.WHITE,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 400,
  },
  close: {
    width: 400,
    height: 400,
  },
  middle: {
    width: 200,
    height: 200,
  },
  far: {
    width: 100,
    height: 100,
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
