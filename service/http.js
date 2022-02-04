import axios from 'axios';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;

    this.client = axios.create({
      baseUrl: this.baseUrl,
    });
  }

  async fetch(req) {
    const res = await this.client(req);

    return res.data;
  }
}

export default HttpClient;
