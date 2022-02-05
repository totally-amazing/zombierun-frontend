import ErrorMessage from '../common/components/ErrorMessage';

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
      return ErrorMessage(err.message);
    }
  };
}

export default AuthService;
