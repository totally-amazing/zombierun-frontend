import { ERROR } from '../common/constants/MESSAGE';
import getAuthorizationHeader from '../common/utils/getAuthorizationHeader';

class GameService {
  constructor(httpClient, socket) {
    this.httpClient = httpClient;
    this.socket = socket;
  }

  getTotalRecord = async (userId) => {
    const result = await this.httpClient.fetch({
      url: `/game/total/?userId=${userId}`,
      method: 'get',
      headers: getAuthorizationHeader(),
    });

    if (!result) {
      throw new Error(ERROR.NO_TOTAL_RECORD);
    }

    return result;
  };

  getRecentRecord = async (userId) => {
    const result = await this.httpClient.fetch({
      url: `/game/recent/?userId=${userId}`,
      method: 'get',
      headers: getAuthorizationHeader(),
    });

    if (!result) {
      throw new Error(ERROR.NO_RECENT_RECORD);
    }

    return result;
  };

  update = async (id, player) => {
    await this.httpClient.fetch({
      url: `/game/${id}`,
      method: 'put',
      data: player,
      headers: getAuthorizationHeader(),
    });
  };

  create = async (game) => {
    const result = this.httpClient.fetch({
      url: '/game',
      method: 'post',
      data: game,
      headers: getAuthorizationHeader(),
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
