class GameService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getTotalRecord = async (userId) => {
    const result = await this.httpClient.fetch(
      `/game/total/?userId=${userId}`,
      {
        method: 'get',
      },
    );

    if (!result) {
      throw new Error('서버에서 total record를 받아오지 못했습니다');
    }

    return result;
  };

  getRecentRecord = async (userId) => {
    const result = await this.httpClient.fetch(
      `/game/recent/?userId=${userId}`,
      {
        method: 'get',
      },
    );

    if (!result) {
      throw new Error('서버에서 recent record를 받아오지 못했습니다');
    }

    return result;
  };
}

export default GameService;
