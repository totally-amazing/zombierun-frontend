import { checkAuth, setUser } from './authSlice';
import ErrorMessage from '../common/components/ErrorMessage';

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
      ErrorMessage(err.message);
    }
  };
};

export default sendUserId;
