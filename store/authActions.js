import { checkAuth } from './authSlice';
import { setUser } from './userSlice';
import showErrorMessage from '../common/components/ErrorMessage';

const sendUserId = (idToken) => {
  return async (dispatch) => {
    try {
      const response = await fetch('backendAddress', {
        method: 'POST',
        body: idToken,
      });

      const user = response.json();
      dispatch(checkAuth(true));
      dispatch(setUser(user));
    } catch (err) {
      showErrorMessage(err.message);
    }
  };
};

export default sendUserId;
