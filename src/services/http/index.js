import axios from 'axios';

export class Http {
  constructor() {
    this.axios = axios.create();
    this.cancelToken = axios.CancelToken;
    this.isCancel = axios.isCancel;
  }

  get(url, params) {
    return this.axios.get(url, params);
  }
}

export default new Http();
