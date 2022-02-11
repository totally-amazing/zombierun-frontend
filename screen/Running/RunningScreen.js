import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import * as Location from 'expo-location';

import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import Timer from './components/Timer';
import Pause from './components/Pause';
import AudioController from './audioController';
import SettingScreen from '../Setting/SettingScreen';

const RunningScreen = ({ route, navigation }) => {
  const { speed, time } = route.params.gameSetting;
  const conversionRate = 0.277778;
  const [userDistance, setUserDistance] = useState(0);
  const [tracker, setTracker] = useState();
  const [zombieSize, setZombieSize] = useState('far');
  const [zombieDistance, setZombieDistance] = useState(-500);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [hasGameFinished, setHasGameFinished] = useState(false);

  const locationHistory = useRef([]);
  const survivalTime = useRef(time);
  const countDown = useRef();
  const intervalId = useRef();
  const { current: audioController } = useRef(new AudioController(true, true));

  const speedMeterPerSecond = Math.ceil(conversionRate * speed);
  const distanceGap = Math.ceil(userDistance - zombieDistance);

  survivalTime.current = time;

  const startRunning = async () => {
    setHasGameStarted(true);

    audioController.playAllSound();

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

    const zombieMovement = setInterval(() => {
      setZombieDistance((previousDistance) => {
        const reducedZombieDistance = previousDistance + speedMeterPerSecond;

        return reducedZombieDistance;
      });
    }, 1000);
    intervalId.current = zombieMovement;
    setTracker(userLocation);
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
      tracker?.remove();
      clearInterval(intervalId.current);
      intervalId.current = null;
      setHasGameStarted(false);
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

  useEffect(() => {
    getCurrentLocation();

    audioController.loadAudio();

    countDown.current = setTimeout(startRunning, 5000);

    return () => {
      audioController.resetAudio();
      clearTimeout(countDown.current);
      tracker?.remove();
    };
  }, []);

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
      tracker?.remove();
      audioController.resetAudio();
      navigation.navigate('Result', {
        result: {
          locationHistory,
          isWinner,
          distance: userDistance,
          time: survivalTime.current,
          speed,
        },
      });
    }
  }, [isWinner, hasGameFinished]);

  return (
    <View style={styles.screen}>
      {!hasGameStarted && <Pause onPress={handlePressStartButton} />}
      <View style={styles.imageContainer}>
        <Image
          style={styles[zombieSize]}
          source={require('../../assets/images/zombie.gif')}
        />
      </View>
      <Timer
        time={time}
        hasStarted={hasGameStarted}
        onFinish={handleFinishGame}
        hasFinished={hasGameFinished}
      />
      <Text style={styles.distance}>Distance:{distanceGap}</Text>
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
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 400,
  },
  distance: {
    fontSize: FONT.X_LARGE,
    color: COLORS.WHITE,
    fontFamily: FONT.BLOOD_FONT,
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
