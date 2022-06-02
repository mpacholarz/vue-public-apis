export default {
  apiPrefix: process.env.VUE_APP_API_URL,
  endpoints: {
    entries: 'entries',
    categories: 'categories',
  },
  get(endpointLabel, params) {
    if (this.endpoints[endpointLabel] === undefined) {
      throw new Error('undefined api path');
    }

    let url = this.endpoints[endpointLabel];

    if (typeof params === 'object') {
      Object.keys(params).forEach((param) => {
        url = url.replace(`:${param}`, params[param]);
      });
    } else if (url.indexOf('/:') > 0) {
      url = url.substring(0, url.indexOf('/:'));
    }

    return this.apiPrefix.concat(url);
  },
};
