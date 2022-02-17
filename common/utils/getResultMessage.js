import { RESULT } from '../constants/MESSAGE';

const getResultMessage = (mode, role, isWinner) => {
  let message;

  switch (mode) {
    case 'solo': {
      message = isWinner ? RESULT.WINNER_MESSAGE : RESULT.LOSER_MESSAGE;
      break;
    }

    case 'survival': {
      message = isWinner ? RESULT.SURVIVAL_WIN : RESULT.LOSER_MESSAGE;
      break;
    }

    case 'oneOnOne': {
      if (role === 'human') {
        message = isWinner ? RESULT.WINNER_MESSAGE : RESULT.LOSER_MESSAGE;
      } else {
        message = isWinner
          ? RESULT.ONEONONE_ZOMBIE_WIN
          : RESULT.ONEONONE_ZOMBIE_LOSE;
      }
      break;
    }

    default: {
      message = RESULT.WINNER_MESSAGE;
    }
  }

  return message;
};

export default getResultMessage;
