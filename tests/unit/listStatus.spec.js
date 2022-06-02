import { mount } from '@vue/test-utils';
import VListStatus from '@/components/VListStatus.vue';
import { createStore } from 'vuex';
import apis from '@/store/modules/apis';

describe('VListStatus.vue', () => {
  it('renders empty list status', () => {
    const store = createStore({
      modules: {
        apis,
      },
    });
    store.commit('apis/setCount', 0);
    const wrapper = mount(VListStatus, {
      global: {
        provide: {
          store,
        },
      },
    });
    expect(wrapper.text()).toBe('No matching records found, clear and try again');
  });
  it('renders that something went wrong', () => {
    const store = createStore({
      modules: {
        apis,
      },
    });
    store.commit('apis/setCount', 1);
    store.commit('apis/setRequestFailed', true);
    const wrapper = mount(VListStatus, {
      global: {
        provide: {
          store,
        },
      },
    });
    expect(wrapper.text()).toBe('Something went wrong, try again');
  });
});
