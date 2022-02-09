import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Audio } from 'expo-av';
import * as Location from 'expo-location';

import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import SettingScreen from '../Setting/SettingScreen';
import ShowErrorMessage from '../../common/components/ShowErrorMessage';
import Timer from './Timer';
import AudioController from './audioCotroller';

const RunningScreen = (props) => {
  const speed = useSelector((state) => state.game.speed);
  const time = useSelector((state) => state.game.time);
  const navigation = useNavigation();

  const [userDistance, setUserDistance] = useState(0);
  const [zombieDistance, setZombieDistance] = useState(-500);
  const [hasGameStop, setHasGameStop] = useState(false);
  const [tracker, setTracker] = useState(null);
  const [zombieStatus, setZombieStatus] = useState();
  const [message, setMessage] = useState('');
  const [locationHistory, setLocationHistory] = useState([]);

  const speedMeterPerSecond = Math.ceil(0.277778 * speed);
  const distanceGap = Math.floor(userDistance - zombieDistance);
  let countDown;

  // 음악 재생 부분  react native sound

  const startRunning = async () => {
    const source = require('../../assets/sounds/background.mp3');

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
    if (!hasGameStop) {
      tracker?.remove();
      clearInterval(zombieStatus);
      setZombieStatus(null);
    }

    setHasGameStop((prevState) => !prevState);
  };

  useEffect(() => {
    getCurrentLocation();

    if (!hasGameStop) {
      countDown = setTimeout(startRunning, 5000);
    }

    return () => {
      clearTimeout(countDown);
      tracker?.remove();
    };
  }, [hasGameStop]);

  useEffect(() => {
    if (distanceGap <= 500) {
      setMessage('다가온다');
      // 사운드 설정
    }

    if (distanceGap <= 200) {
      setMessage('다 왔음');
      // 사운드 설정
    }

    if (distanceGap < 0) {
      setMessage('잡아먹힘');
      tracker?.remove();
      clearInterval(zombieStatus);
      setHasGameStop((prevState) => !prevState);
      navigation.navigate('Result', {
        result: locationHistory,
      });
      // 사운드 설정
    }
  }, [distanceGap]);

  return (
    <View style={styles.screen}>
      <Timer time={time} start={hasGameStop} />
      <Text style={styles.text}>Distance:{distanceGap}</Text>
      <Text>{message}</Text>
      <Text>{userDistance}</Text>
      <Button
        title={!hasGameStop ? 'stop' : 'start'}
        onPress={handleStopButton}
      />
      <Image
        style={{ width: 300, height: 200, zIndex: 0 }}
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
});
