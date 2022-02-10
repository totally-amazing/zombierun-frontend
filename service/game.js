class GameService {
  constructor(httpClient, socket) {
    this.httpClient = httpClient;
    this.socket = socket;
  }

  getTotalRecord = async (userId) => {
    const result = await this.httpClient.fetch({
      url: `/game/total/?userId=${userId}`,
      method: 'get',
    });

    if (!result) {
      throw new Error('서버에서 total record를 받아오지 못했습니다');
    }

    return result;
  };

  getRecentRecord = async (userId) => {
    const result = await this.httpClient.fetch({
      url: `/game/recent/?userId=${userId}`,
      method: 'get',
    });

    if (!result) {
      throw new Error('서버에서 recent record를 받아오지 못했습니다');
    }

    return result;
  };

  update = async (game) => {
    this.httpClient.fetch({
      url: '/game',
      method: 'put',
      data: game,
    });
  };

  create = async (game) => {
    this.httpClient.fetch({
      url: '/game',
      method: 'post',
      data: game,
    });
  };

  emitDie = (gameId) => {
    this.socket.emit('user/die', gameId);
  };
}

export default GameService;
