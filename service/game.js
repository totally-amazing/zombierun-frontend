import { ERROR } from '../common/constants/MESSAGE';
import getAuthorizationHeader from '../common/utils/getAuthorizationHeader';

class GameService {
  constructor(httpClient, socket) {
    this.httpClient = httpClient;
    this.socket = socket;
  }

  getTotalRecord = async (userId) => {
    const authHeader = await getAuthorizationHeader();

    const result = await this.httpClient.fetch({
      url: `/game/total/?userId=${userId}`,
      method: 'get',
      headers: authHeader,
    });

    if (!result) {
      throw new Error(ERROR.NO_TOTAL_RECORD);
    }

    return result;
  };

  getRecentRecord = async (userId) => {
    const authHeader = await getAuthorizationHeader();

    const result = await this.httpClient.fetch({
      url: `/game/recent/?userId=${userId}`,
      method: 'get',
      headers: authHeader,
    });

    if (!result) {
      throw new Error(ERROR.NO_RECENT_RECORD);
    }

    return result;
  };

  update = async (id, player) => {
    const authHeader = await getAuthorizationHeader();

    await this.httpClient.fetch({
      url: `/game/${id}`,
      method: 'put',
      data: player,
      headers: authHeader,
    });
  };

  create = async (game) => {
    const authHeader = await getAuthorizationHeader();

    const result = this.httpClient.fetch({
      url: '/game',
      method: 'post',
      data: game,
      headers: authHeader,
    });

    return result;
  };

  on = (event, callback) => {
    return this.socket.on(`game/${event}`, callback);
  };

  emit = (event, ...args) => {
    this.socket.emit(`game/${event}`, args);
  };
}

export default GameService;
