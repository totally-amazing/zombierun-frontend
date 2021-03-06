import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import { useDispatch } from 'react-redux';
import {
  GOOGLE_EXPO_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
} from '@env';

import COLORS from '../../common/constants/COLORS';
import FONT from '../../common/constants/FONT';
import { signIn } from '../../store/userSlice';
import CustomButton from '../../common/components/CustomButton';

const AuthScreen = () => {
  const dispatch = useDispatch();

  const [request, response, promptAsync] = useIdTokenAuthRequest({
    expoClientId: GOOGLE_EXPO_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    responseType: 'id_token',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      dispatch(signIn(response.params.id_token));
    }
  }, [response, dispatch]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>ZOMBIE RUN</Text>
      <CustomButton
        message="Google Sign In"
        disabled={!request}
        onPress={promptAsync}
      />
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 50,
    backgroundColor: COLORS.BLACK,
  },
  title: {
    marginTop: 60,
    fontFamily: FONT.BLOOD_FONT,
    fontSize: FONT.X_LARGE,
    color: COLORS.RED,
  },
});
