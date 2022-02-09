import { BASE_URL } from '@env';

import { checkAuth } from './authSlice';
import { setUser } from './userSlice';
import HttpClient from '../network/http';
import AuthService from '../service/auth';
import showErrorMessage from '../common/utils/showErrorMessage';

const httpClient = new HttpClient(BASE_URL);
const authService = new AuthService(httpClient);

const sendUserId = (idToken) => {
  return async (dispatch) => {
    try {
      const user = await authService.signIn(idToken);

      dispatch(checkAuth(true));
      dispatch(setUser(user));
    } catch (err) {
      showErrorMessage(err.message);
    }
  };
};

export default sendUserId;
