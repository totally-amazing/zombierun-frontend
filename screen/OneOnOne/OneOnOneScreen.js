import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import RoleChoice from './components/RoleChoice';
import ExitButton from './components/ExitButton';
import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import PROFILE from '../../common/constants/PROFILE';
import CustomButton from '../../common/components/CustomButton';
import usePlayers, {
  emitNotReady,
  emitReady,
  emitHuman,
  emitZombie,
  emitLeave,
  emitGameStart,
} from '../../common/hooks/useSocket';
import { markNotReady, markReady } from '../../store/playerSlice';
import { createGameRecord, switchRole } from '../../store/gameSlice';
import Profile from '../../common/components/Profile';

const OneOnOneScreen = ({ navigation }) => {
  const [isReady, setIsReady] = useState(false);
  const [canStart, setCanStart] = useState(false);
  const dispatch = useDispatch();
  const players = usePlayers();
  const currentRoom = useSelector((state) => state.room.current);
  const userId = useSelector((state) => state.user.id);
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
      dispatch(markNotReady(userId));
      emitNotReady();
    } else {
      dispatch(markReady(userId));
      emitReady();
    }
  };

  const handlePressStartButton = async () => {
    const gameId = await dispatch(
      createGameRecord({ mode: currentRoom.mode, userId, role }),
    );
    emitGameStart(gameId);
    navigation.navigate('Running');
  };

  const handleExitRoom = () => {
    emitLeave(currentRoom, players);
    navigation.navigate('RoomList');
  };

  useEffect(() => {
    const isAllReady = players.every((player) => player.isReady);

    if (isAllReady) {
      setCanStart(true);
    } else {
      setCanStart(false);
    }
  }, [players]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>원하는 역할을 선택해주세요</Text>
      <RoleChoice onPress={handlePressToggleButton} role={role} />
      <View style={styles.profileContainer}>
        {players.map((player) => {
          return (
            <View style={styles.profile} key={player.id}>
              <View style={styles.user}>
                <Profile size="medium" imageUrl={player.imageUrl} />
                <Text style={styles.nickname}>{player.nickname}</Text>
              </View>
              {!players[1] && (
                <View style={styles.user}>
                  <Profile size="medium" />
                  <Text style={styles.nickname}>대기중</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
      <CustomButton
        message={canStart ? 'Start' : 'Ready'}
        style={isReady && !canStart ? styles.start : styles.ready}
        disabled={false}
        onPress={canStart ? handlePressStartButton : handlePressReadyButton}
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
    marginBottom: 10,
    fontSize: FONT.X_SMALL,
    color: COLORS.GRAY,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    height: 300,
    marginHorizontal: 40,
    marginTop: 100,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 300,
    width: '80%',
  },
  user: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  nickname: {
    marginBottom: 50,
    fontSize: FONT.SMALL,
    color: COLORS.WHITE,
    lineHeight: PROFILE.MEDIUM,
  },
  ready: {
    fontSize: FONT.LARGE,
    fontFamily: FONT.BLOOD_FONT,
    borderWidth: 3,
    borderColor: COLORS.RED,
    color: COLORS.RED,
    backgroundColor: COLORS.BLACK,
  },
  start: {
    fontSize: FONT.LARGE,
    fontFamily: FONT.BLOOD_FONT,
    color: COLORS.BLACK,
    backgroundColor: COLORS.GRAY,
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
