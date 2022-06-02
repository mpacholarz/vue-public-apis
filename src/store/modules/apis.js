import apis from '@/services/http/api/apis';

export default {
  namespaced: true,
  state: {
    isLoading: null,
    list: [],
    count: null,
    requestFailed: false,
  },
  getters: {
    isLoading: (state) => state.isLoading,
    getList: (state) => state.list,
    getCount: (state) => state.count,
    requestFailed: (state) => state.requestFailed,
  },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setList(state, payload) {
      state.list = payload;
    },
    setCount(state, payload) {
      state.count = payload;
    },
    setRequestFailed(state, payload) {
      state.requestFailed = payload;
    },
    clearListState(state) {
      state.list = [];
      state.count = null;
      state.requestFailed = false;
    },
  },
  actions: {
    getAll({ commit }, params) {
      commit('setLoading', true);
      commit('clearListState');
      return apis.get({ params }).then(({ data }) => {
        commit('setList', data.entries || []);
        commit('setCount', data.count);
      }).catch(() => {
        commit('setRequestFailed', true);
      }).finally(() => {
        commit('setLoading', false);
      });
    },
  },
};
