import React from 'react';
import PropTypes from 'prop-types';
import { View, Pressable, StyleSheet, Text } from 'react-native';

import COLORS from '../../../common/constants/COLORS';
import FONT from '../../../common/constants/FONT';

const RoomListItem = ({ onPress, item }) => {
  const mode = item.mode === 'OneOnOne' ? '1:1' : item.mode;
  const time = item.time && `러닝타임 ${item.time}분`;
  const speed = item.speed && `좀비속도 ${item.speed}km/h`;
  const participants = `참여인원 ${item.participants.length}명`;

  return (
    <Pressable onPress={onPress} style={styles.wrapper}>
      <View style={[styles.column, styles.info]}>
        <Text style={styles.mode}>{mode}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.row}>
          <Text style={styles.detail}>{time || speed}</Text>
          <Text style={styles.detail}>{participants}</Text>
        </View>
      </View>
      <View style={styles.column}>
        <Text style={styles.triangle}>▶</Text>
      </View>
    </Pressable>
  );
};

export default RoomListItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginVertical: 16,
    width: 300,
    borderWidth: 3,
    borderRadius: 24,
    borderStyle: 'solid',
    borderColor: COLORS.RED,
  },
  column: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  mode: {
    color: COLORS.RED,
    fontSize: FONT.SMALL,
  },
  title: {
    marginBottom: 8,
    fontSize: FONT.MEDIUM,
    color: COLORS.RED,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
  },
  detail: {
    color: COLORS.RED,
  },
  triangle: {
    fontSize: FONT.SMALL,
    color: COLORS.RED,
  },
});

RoomListItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.number,
    speed: PropTypes.number,
    participants: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
