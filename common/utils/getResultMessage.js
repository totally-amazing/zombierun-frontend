const getResultMessage = (mode, role, isWinner) => {
  let message;

  switch (mode) {
    case 'solo': {
      message = isWinner ? "You're survived" : "You're infected";
      break;
    }

    case 'survival': {
      message = isWinner ? '1st player' : "You're infected";
      break;
    }

    case 'oneOnOne': {
      if (role === 'human') {
        message = isWinner ? "You're survived" : "You're infected";
      } else {
        message = isWinner ? 'You infected the other' : 'You missed food';
      }
      break;
    }

    default: {
      message = "You're survived";
    }
  }

  return message;
};

export default getResultMessage;
