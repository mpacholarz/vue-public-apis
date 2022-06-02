import { createStore } from 'vuex';

import apis from '@/store/modules/apis';
import categories from '@/store/modules/categories';

export default createStore({
  modules: {
    apis,
    categories,
  },
});
