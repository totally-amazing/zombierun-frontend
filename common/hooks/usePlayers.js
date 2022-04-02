import { useSelector } from 'react-redux';

const usePlayers = () => {
  const allPlayerIds = useSelector((state) => state.player.allIds);
  const playersById = useSelector((state) => state.player.byId);
  const players = allPlayerIds.map((id) => playersById[id]);

  return players;
};

export default usePlayers;
