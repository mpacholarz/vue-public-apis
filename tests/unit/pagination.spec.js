import { mount } from '@vue/test-utils';
import VPagination from '@/components/VPagination.vue';

describe('VPagination.vue', () => {
  it('counts proper number of pages', () => {
    const count = 25;
    const perPage = 12;
    const currentPage = 0;
    const wrapper = mount(VPagination, {
      props: { count, perPage, currentPage },
    });

    expect(wrapper.vm.pages).toBe(3);
  });
  it('renders first page', () => {
    const count = 48;
    const perPage = 12;
    const currentPage = 3;
    const wrapper = mount(VPagination, {
      props: { count, perPage, currentPage },
    });

    expect(wrapper.vm.showFirst).toBe(true);
  });
  it('renders last page', () => {
    const count = 48;
    const perPage = 12;
    const currentPage = 0;
    const wrapper = mount(VPagination, {
      props: { count, perPage, currentPage },
    });

    expect(wrapper.vm.showLast).toBe(true);
  });
  it('emits an event with first page when clicked', () => {
    const count = 48;
    const perPage = 12;
    const currentPage = 3;
    const wrapper = mount(VPagination, {
      props: { count, perPage, currentPage },
    });
    wrapper.find('.page-fl a.page').trigger('click');

    const pageNumber = wrapper.emitted('page');
    expect(pageNumber[0]).toEqual([0]);
  });
  it('emits an event with last page when clicked', () => {
    const count = 48;
    const perPage = 12;
    const currentPage = 0;
    const wrapper = mount(VPagination, {
      props: { count, perPage, currentPage },
    });
    wrapper.find('.page-fl a.page').trigger('click');

    const pageNumber = wrapper.emitted('page');
    expect(pageNumber[0]).toEqual([3]);
  });
});
