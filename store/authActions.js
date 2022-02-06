import { checkAuth, setUser } from './authSlice';
import ShowErrorMessage from '../common/components/ShowErrorMessage';

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
      ShowErrorMessage(err.message);
    }
  };
};

export default sendUserId;
