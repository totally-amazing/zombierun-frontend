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

    return result;
  };
}

export default GameService;
