import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import RoomListItem from './components/RoomListItem';
import RoomMakerScreen from '../RoomMaker/RoomMakerScreen';
import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import { enterRoom } from '../../store/roomSlice';

const RoomListScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const allRoomIds = useSelector((state) => state.room.allIds);
  const roomsById = useSelector((state) => state.room.byId);
  const roomList = allRoomIds.map((id) => roomsById[id]);

  const handleJoinRoom = (room) => {
    dispatch(enterRoom({ room, user }));

    if (room.mode === 'oneOnOne') {
      navigation.push('OneOnOne');
    } else {
      navigation.push('Survival');
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Room List</Text>
      <FlatList
        data={roomList}
        renderItem={({ item }) => (
          <RoomListItem onPress={() => handleJoinRoom(item)} item={item} />
        )}
        keyExtractor={(item) => String(item.id)}
      />
      <RoomMakerScreen />
    </View>
  );
};

export default RoomListScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
  },
  title: {
    fontFamily: FONT.BLOOD_FONT,
    fontSize: FONT.X_LARGE,
    color: COLORS.RED,
  },
});

RoomListScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};
