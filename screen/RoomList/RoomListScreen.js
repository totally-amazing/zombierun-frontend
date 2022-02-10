import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import RoomListItem from './components/RoomListItem';
import RoomMakerScreen from '../RoomMaker/RoomMakerScreen';
import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
<<<<<<< HEAD
import { useRoomList } from '../../common/hooks/useRoom';
import showErrorMessage from '../../common/utils/showErrorMessage';
=======
import RoomListItem from './components/RoomListItem';
import RoomMakerScreen from '../RoomMaker/RoomMakerScreen';
import useRoomList from '../../common/hooks/useRoom';
>>>>>>> a88c863 (fix: solve consflict)

const RoomListScreen = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);

<<<<<<< HEAD
  useRoomList(setRooms, (error) => {
    showErrorMessage(error.message);
  });
=======
  useRoomList(setRooms);
>>>>>>> a88c863 (fix: solve consflict)

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
