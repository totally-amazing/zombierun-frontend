import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import RoleChoice from './components/RoleChoice';
import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import PROFILE from '../../common/constants/PROFILE';
import CustomButton from '../../common/components/CustomButton';
import usePlayers, {
  emitOneOnOneLeave,
  emitNotReady,
  emitReady,
  emitHuman,
  emitZombie,
} from '../../common/hooks/usePlayers';
import { markNotReady, markReady } from '../../store/playerSlice';
import { switchRole } from '../../store/gameSlice';
import ExitButton from './components/ExitButton';

const OneOnOneScreen = ({ navigation }) => {
  const [isReady, setIsReady] = useState(false);
  const [shouldStart, setShouldStart] = useState(false);

  const dispatch = useDispatch();
  const players = usePlayers();
  const currentRoom = useSelector((state) => state.room.current);
  const { id } = useSelector((state) => state.user);
  const { role } = useSelector((state) => state.game);

  useEffect(() => {
    if (players.length === 1) {
      dispatch(switchRole('human'));
    }
  }, []);

  const handlePressToggleButton = () => {
    if (players.length < 2) {
      return;
    }

    if (role === 'human') {
      dispatch(switchRole('zombie'));
      emitZombie();
    } else {
      dispatch(switchRole('human'));
      emitHuman();
    }
  };

  const handlePressReadyButton = () => {
    if (players.length < 2) {
      return;
    }
    setIsReady((prev) => !prev);

    if (isReady) {
      dispatch(markNotReady(id));
      emitNotReady();
    } else {
      dispatch(markReady(id));
      emitReady();
    }
  };

  const handlePressStartButton = () => {};

  const handleExitRoom = () => {
    navigation.navigate('RoomList');
    emitOneOnOneLeave(currentRoom, players);
  };

  useEffect(() => {
    const isAllReady = players.every((player) => player.isReady);

    if (isAllReady) {
      setShouldStart(true);
    } else {
      setShouldStart(false);
    }
  }, [players]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>원하는 역할을 선택해주세요</Text>
      <RoleChoice onPress={handlePressToggleButton} role={role} />
      <View style={styles.profileContainer}>
        {players.map((player, i) => {
          return (
            <View style={styles.profile} key={player.id}>
              <View style={styles.user}>
                <Image
                  source={{ uri: player.imageUrl }}
                  style={styles.medium}
                />
                <Text style={styles.nickname}>{player.nickname}</Text>
              </View>
              {!players[1] && (
                <View style={styles.user}>
                  <Image
                    source={require('../../assets/waiting.jpeg')}
                    style={styles.medium}
                  />
                  <Text style={styles.nickname}>대기중</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
      <CustomButton
        message={shouldStart ? 'Start' : 'Ready'}
        style={isReady && !shouldStart ? styles.start : styles.ready}
        disabled={false}
        onPress={shouldStart ? handlePressStartButton : handlePressReadyButton}
      />
      <ExitButton onPress={handleExitRoom} text="exit" />
    </View>
  );
};

export default OneOnOneScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: COLORS.BLACK,
  },
  title: {
    color: COLORS.GRAY,
    fontSize: FONT.X_SMALL,
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    marginHorizontal: 40,
    marginTop: 100,
    height: 300,
    width: '80%',
    justifyContent: 'space-around',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 300,
    width: '80%',
    justifyContent: 'space-around',
  },
  user: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  nickname: {
    marginBottom: 50,
    color: COLORS.WHITE,
    fontSize: FONT.SMALL,
    lineHeight: PROFILE.MEDIUM,
  },
  ready: {
    color: COLORS.RED,
    backgroundColor: COLORS.BLACK,
    borderWidth: 3,
    borderColor: COLORS.RED,
    fontSize: FONT.LARGE,
    fontFamily: FONT.BLOOD_FONT,
  },
  start: {
    color: COLORS.BLACK,
    backgroundColor: COLORS.GRAY,
    fontSize: FONT.LARGE,
    fontFamily: FONT.BLOOD_FONT,
  },
  medium: {
    width: PROFILE.MEDIUM,
    height: PROFILE.MEDIUM,
    borderRadius: PROFILE.MEDIUM_BORDER_RADIUS,
  },
});

OneOnOneScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};
