import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import RoomListItem from './components/RoomListItem';
import RoomMakerScreen from '../RoomMaker/RoomMakerScreen';
import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';

const RoomListScreen = ({ navigation }) => {
  const roomList = useSelector((state) => state.room.list);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Room List</Text>
      <FlatList
        data={roomList}
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
