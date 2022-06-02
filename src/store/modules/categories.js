import categories from '@/services/http/api/categories';

export default {
  namespaced: true,
  state: {
    isLoading: null,
    categories: [],
  },
  getters: {
    isLoading: (state) => state.isLoading,
    getCategories: (state) => state.categories,
  },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setCategories(state, payload) {
      state.categories = payload;
    },
  },
  actions: {
    getAll({ commit }) {
      commit('setLoading', true);
      return categories.get().then(({ data }) => {
        commit('setCategories', data.categories);
      }).finally(() => {
        commit('setLoading', false);
      });
    },
  },
};
