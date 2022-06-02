import http from '@/services/http/index';
import endpoints from '@/services/http/endpoints';

export default {
  get(params) {
    return http.get(endpoints.get('categories'), params);
  },
};
