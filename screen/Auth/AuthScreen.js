import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import * as Google from 'expo-auth-session/providers/google';
import { useDispatch } from 'react-redux';
import {
  GOOGLE_EXPO_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
} from '@env';

import COLORS from '../../common/constants/COLORS';
import FONT_SIZE from '../../common/constants/FONT_SIZE';
import sendUserId from '../../store/authActions';
import ActiveButton from '../../common/components/ActiveButton';

const AuthScreen = () => {
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_EXPO_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    responseType: 'id_token',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      dispatch(sendUserId(response.params.id_token));
    }
  }, [response, dispatch]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>ZOOMIE RUN</Text>
      <ActiveButton
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
    marginTop: 20,
    fontFamily: 'nosifer-regular',
    fontSize: FONT_SIZE.X_LARGE,
    color: COLORS.DEEP_RED,
  },
});
