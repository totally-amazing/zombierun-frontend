import axios from 'axios';
import showErrorMessage from '../common/utils/showErrorMessage';

class HttpClient {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
    });
  }

  fetch = async (req) => {
    let res;

    try {
      res = await this.client(req);
    } catch (err) {
      showErrorMessage(err.message);
    }

    return res?.data;
  };
}

export default HttpClient;
