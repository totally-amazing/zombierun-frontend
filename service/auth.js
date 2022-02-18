import AsyncStorage from '@react-native-async-storage/async-storage';

import getAuthorizationHeader from '../common/utils/getAuthorizationHeader';

class AuthService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  signIn = async (idToken) => {
    const result = await this.httpClient.fetch({
      url: '/auth/signin',
      method: 'post',
      data: { idToken },
    });

    AsyncStorage.setItem('token', result.token);

    return result;
  };

  me = async () => {
    const authHeader = await getAuthorizationHeader();

    const result = await this.httpClient.fetch({
      url: '/auth/me',
      method: 'get',
      headers: authHeader,
    });

    AsyncStorage.setItem('token', result.token);

    return result;
  };
}

export default AuthService;
