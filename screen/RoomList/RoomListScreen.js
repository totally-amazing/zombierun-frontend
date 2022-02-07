import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { BASE_URL } from '@env';

import ActiveButton from '../../common/components/ActiveButton';
import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import RoomListItem from './components/RoomListItem';
import RoomService from '../../service/room';
import HttpClient from '../../service/http';
import showErrorMessage from '../../common/components/ShowErrorMessage';

const httpClient = new HttpClient(BASE_URL);
const roomService = new RoomService(httpClient);

const RoomListScreen = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);

  useState(() => {
    roomService
      .getRooms()
      .then(setRooms)
      .catch((error) => showErrorMessage(error.message));
  }, [roomService]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Room List</Text>
      <FlatList
        data={rooms}
        renderItem={({ item }) => (
          <RoomListItem
            onPress={() => navigation.push('Room', item.id)}
            item={item}
          />
        )}
        keyExtractor={(item) => String(item.id)}
      />
      <ActiveButton
        message="방 만들기"
        onPress={() => navigation.push('RoomMaker')}
        disabled={false}
      />
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
  room: {
    color: COLORS.WHITE,
  },
});

RoomListScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};
