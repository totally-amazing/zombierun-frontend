import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import COLORS from '../constants/COLORS';
import FONT from '../constants/FONT';

const ArrowMain = () => {
  const navigation = useNavigation();

  const handleGoToMainButton = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.navButtonContainer}>
      <Pressable style={styles.navButton} onPress={handleGoToMainButton}>
        <AntDesign name="arrowleft" size={20} color={COLORS.DEEP_RED} />
        <Text style={styles.text}>To the Main</Text>
      </Pressable>
    </View>
  );
};

export default ArrowMain;

const styles = StyleSheet.create({
  navButtonContainer: {
    width: 100,
    right: 130,
    marginTop: 80,
  },
  navButton: {
    flexDirection: 'row',
  },
  text: {
    color: COLORS.DEEP_RED,
    fontSize: FONT.X_SMALL,
    fontWeight: 'bold',
  },
});
