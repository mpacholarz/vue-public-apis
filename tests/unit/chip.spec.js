import { mount } from '@vue/test-utils';
import VChip from '@/components/VChip.vue';

describe('VChip.vue', () => {
  it('renders chip name when passed', () => {
    const name = 'name';
    const value = true;
    const wrapper = mount(VChip, {
      props: { name, value },
    });

    const chip = wrapper.get('[data-test="chip"]');

    expect(chip.get('span').text()).toBe(name);
  });
  it('does not render chip', () => {
    const name = 'name';
    const value = null;
    const wrapper = mount(VChip, {
      props: { name, value },
    });

    const chip = wrapper.find('[data-test="chip"]');

    expect(chip.exists()).toBe(false);
  });
  it('renders chip with green icon', () => {
    const name = 'name';
    const value = true;
    const wrapper = mount(VChip, {
      props: { name, value },
    });

    const chip = wrapper.get('[data-test="chip"]');

    expect(chip.get('svg path').attributes('fill')).toBe('green');
  });
  it('renders chip with red icon', () => {
    const name = 'name';
    const value = false;
    const wrapper = mount(VChip, {
      props: { name, value },
    });

    const chip = wrapper.get('[data-test="chip"]');

    expect(chip.get('svg path').attributes('fill')).toBe('red');
  });
});
