import ShowErrorMessage from '../common/components/ShowErrorMessage';

class AuthService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  signIn = async () => {
    try {
      const result = await this.httpClient.fetch({
        url: '/auth/signin',
        method: 'post',
      });

      return result;
    } catch (err) {
      return ShowErrorMessage(err.message);
    }
  };
}

export default AuthService;
