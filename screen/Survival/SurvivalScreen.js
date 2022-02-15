import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Pressable, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import ProfileItem from './ProfileItem/ProfileItem';
import CustomButton from '../../common/components/CustomButton';
import TextChunk from '../../common/components/TextChunk';
import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import usePlayers, {
  emitLeave,
  emitReady,
  emitNotReady,
  emitGmaeStart,
} from '../../common/hooks/useSocket';
import { markNotReady, markReady } from '../../store/playerSlice';
import { createGameRecord } from '../../store/gameSlice';

const SurvivalScreen = ({ navigation }) => {
  const [canStart, setCanStart] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const dispatch = useDispatch();
  const currentRoom = useSelector((state) => state.room.current);
  const { id } = useSelector((state) => state.user);
  const players = usePlayers();

  const handlePressReadyButton = () => {
    if (players.length < 2) {
      return;
    }

    setIsReady((prev) => !prev);

    // 이미 ready인 상태에선 ready 버튼을 클릭했을 때 emit notReady
    if (isReady) {
      dispatch(markNotReady(id));
      emitNotReady();
    } else {
      dispatch(markReady(id));
      emitReady();
    }
  };

  const handlePressStartButton = () => {
    dispatch(createGameRecord({ mode: currentRoom.mode, userId: id }));
    emitGmaeStart(currentRoom.mode);
    navigation.navigate('Running');
  };

  const handleExitRoom = () => {
    navigation.navigate('RoomList');
    emitLeave(currentRoom, players);
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
      <View style={styles.row}>
        <TextChunk title="인원" value={players.length} unit="명" />
        <TextChunk title="좀비 속도" value={currentRoom?.speed} unit="km/h" />
      </View>

      <FlatList
        style={styles.players}
        data={players}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 32,
        }}
        renderItem={({ item }) => <ProfileItem item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={4}
      />

      <CustomButton
        message={canStart ? 'Start' : 'Ready'}
        style={isReady && !canStart ? styles.gray : styles.red}
        disabled={false}
        onPress={canStart ? handlePressStartButton : handlePressReadyButton}
      />

      <Pressable style={styles.exit} onPress={handleExitRoom}>
        <AntDesign name="arrowleft" size={20} color={COLORS.DEEP_RED} />
        <Text style={styles.text}>exit</Text>
      </Pressable>
    </View>
  );
};

export default SurvivalScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
  },
  players: {
    width: 300,
    maxHeight: 400,
    marginTop: 32,
  },
  red: {
    color: COLORS.RED,
    backgroundColor: COLORS.BLACK,
    borderWidth: 3,
    borderColor: COLORS.RED,
    fontSize: FONT.LARGE,
    fontFamily: FONT.BLOOD_FONT,
  },
  gray: {
    color: COLORS.BLACK,
    backgroundColor: COLORS.GRAY,
    fontSize: FONT.LARGE,
    fontFamily: FONT.BLOOD_FONT,
  },
  exit: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 32,
    marginLeft: 32,
  },
  text: {
    color: COLORS.RED,
  },
});

SurvivalScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};
