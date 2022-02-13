import { useSelector } from 'react-redux';

const usePlayers = () => {
  const allPlayerIds = useSelector((state) => state.room.allPlayerIds);
  const playersById = useSelector((state) => state.room.playersById);
  const players = allPlayerIds.map((id) => playersById[id]);

  return players;
};

export default usePlayers;
