/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import SettingScreen from '../Setting/SettingScreen';
import Timer from './Timer';
import AudioController from './audioCotroller';
import Pause from './Pause';

const RunningScreen = ({ route }) => {
  const navigation = useNavigation();
  const { speed, time } = route.params.gameSetting;
  const [userDistance, setUserDistance] = useState(0);
  const [zombieDistance, setZombieDistance] = useState(-500);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [tracker, setTracker] = useState(null);
  const [zombieStatus, setZombieStatus] = useState();
  const [zombieSize, setZombieSize] = useState('far');
  const [isWinner, setIsWinner] = useState(false);
  const [locationHistory, setLocationHistory] = useState([]);
  const [audioController, setAudioController] = useState(
    new AudioController(true, true),
  );

  const speedMeterPerSecond = Math.ceil(0.277778 * speed);
  const distanceGap = Math.floor(userDistance - zombieDistance);

  let countDown;

  // 음악 재생 부분  react native sound

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
          const reducedDistance = preivousDistance + coords.speed;

          return reducedDistance;
        });
        setLocationHistory((prevHistory) => {
          return [
            ...prevHistory,
            {
              lat: coords.latitude,
              lon: coords.longitude,
            },
          ];
        });
      },
    );

    // 만약 Together 모드로 가정된다면 밑에 부분에 setInterval 로직 부분이
    // 다른 유저한테 받아온 socket 관련 데이터를 받아야함
    const zombieMovement = setInterval(() => {
      setZombieDistance((previousDistance) => {
        const reducedDistance = previousDistance + speedMeterPerSecond;
        return reducedDistance;
      });
    }, 1000);

    setZombieStatus(zombieMovement);
    setTracker(userLocation);
  };

  const getCurrentLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync();

    setLocationHistory((prevHistory) => {
      return [
        ...prevHistory,
        {
          lat: coords.latitude,
          lon: coords.longitude,
        },
      ];
    });
  };

  const handleStopButton = () => {
    if (hasGameStarted) {
      tracker?.remove();
      clearInterval(zombieStatus);
      setZombieStatus(null);
      setHasGameStarted(false);
      audioController.stopAllSound();
    }
  };

  const handleStartButton = () => {
    startRunning();
    setHasGameStarted(true);
    audioController.playAllSound();
  };

  const handleTimeout = () => {
    setIsWinner(true);
  };

  useEffect(() => {
    getCurrentLocation();

    audioController.loadAudio();

    countDown = setTimeout(startRunning, 5000);

    return () => {
      // audioController.stopAllSound();
      audioController.resetAudio();
      clearTimeout(countDown);
      tracker?.remove();
    };
  }, []);

  useEffect(() => {
    if (distanceGap <= 450) {
      audioController.changeSoundEffectVolume(1);
    }

    if (distanceGap <= 200) {
      setZombieSize('middle');
      audioController.changeSoundEffectVolume(4);
    }

    if (distanceGap <= 10) {
      setZombieSize('close');
      audioController.changeSoundEffectVolume(8);
    }

    if (distanceGap < 0) {
      tracker?.remove();
      clearInterval(zombieStatus);
      setHasGameStarted(false);
      navigation.navigate('Result', {
        result: { locationHistory, isWinner, speed, distance: userDistance },
      });
      audioController.resetAudio();
    }
  }, [distanceGap]);

  useEffect(() => {
    if (isWinner) {
      audioController.resetAudio();
      navigation.navigate('Result', {
        result: { locationHistory, isWinner, speed, distance: userDistance },
      });
    }
  }, [isWinner]);

  return (
    <View style={styles.screen}>
      {!hasGameStarted && <Pause onPress={handleStartButton} />}
      <Timer time={1} start={hasGameStarted} onTimeout={handleTimeout} />
      <Text style={styles.text}>Distance:{distanceGap}</Text>
      {hasGameStarted && <Button title="stop" onPress={handleStopButton} />}
      <Image
        style={styles[zombieSize]}
        source={require('../../assets/images/zombie.gif')}
      />
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
  text: {
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
