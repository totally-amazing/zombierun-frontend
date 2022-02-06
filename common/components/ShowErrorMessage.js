import { showMessage } from 'react-native-flash-message';

import COLORS from '../constants/COLORS';

const DURATION = 3000;

const ShowErrorMessage = (message) => {
  showMessage({
    message,
    duration: DURATION,
    style: {
      alignItems: 'center',
      backgroundColor: COLORS.DEEP_RED,
      color: COLORS.WHITE,
    },
  });
};

export default ShowErrorMessage;
