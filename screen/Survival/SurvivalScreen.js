import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Profile from '../../common/components/Profile';

import CustomButton from '../../common/components/CustomButton';
import TextChunk from '../../common/components/TextChunk';
import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';

const SurvivalScreen = () => {
  const [isReady, setIsReady] = useState(false);
  const players = useSelector((state) => state.game.players);

  const handlePressStartButton = () => {
    setIsReady((prev) => !prev);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <TextChunk title="인원" value="20" unit="명" />
        <TextChunk title="좀비 속도" value="6" unit="km/h" />
      </View>

      <FlatList
        style={styles.profile}
        data={players}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 32,
        }}
        renderItem={({ item }) => (
          <Profile size="small" imageUrl={item.imageUrl} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={4}
      />

      <CustomButton
        message="Ready"
        style={isReady ? styles.start : styles.ready}
        disabled={false}
        onPress={handlePressStartButton}
      />
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
  profile: {
    width: 300,
    maxHeight: 500,
    marginTop: 32,
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
});
